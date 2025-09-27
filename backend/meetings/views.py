from django.shortcuts import render
import json
from datetime import datetime
import pytz
import os
import google.generativeai as genai
import csv
import requests

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
from django.conf import settings
from .models import ActionItem, Participant

def get_action_items(request):
    try:
        items = ActionItem.objects.all().order_by('-created_at')
        data = list(items.values('id', 'description', 'assignee', 'status', 'created_at'))
        return JsonResponse({'action_items': data})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def suggest_meeting_slots(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are accepted'}, status=405)

    try:
        data = json.loads(request.body)
        participant_ids = data.get('participant_ids', [])
        if not participant_ids or len(participant_ids) < 2:
            return JsonResponse({'message': 'Please select at least two participants.'}, status=400)

        # 1. Fetch participants from the database
        participants = Participant.objects.filter(id__in=participant_ids)
        p1 = participants[0]
        p2 = participants[1]

        # 2. Get the availability slots for each participant (they are already in UTC)
        p1_slots = p1.slots.all()
        p2_slots = p2.slots.all()

        common_slots = []
        # 3. Find the overlaps directly with the database objects
        for slot1 in p1_slots:
            for slot2 in p2_slots:
                # The start_time and end_time are already timezone-aware UTC objects
                overlap_start = max(slot1.start_time, slot2.start_time)
                overlap_end = min(slot1.end_time, slot2.end_time)

                if overlap_start < overlap_end:
                    duration = (overlap_end - overlap_start).total_seconds()
                    if duration >= 3600: # 60 minutes
                        # Convert to local timezones only when creating the final response
                        p1_tz = pytz.timezone(p1.timezone)
                        p2_tz = pytz.timezone(p2.timezone)

                        # Create a dictionary with a simplified key name for frontend
                        slot_data = {
                            'start_utc': overlap_start.isoformat(),
                            'end_utc': overlap_end.isoformat(),
                            'start_p1': overlap_start.astimezone(p1_tz).isoformat(),
                            'start_p2': overlap_start.astimezone(p2_tz).isoformat(),
                            'p1_name': p1.name,
                            'p2_name': p2.name,
                            'p1_timezone': p1.timezone, # Added timezone name
                            'p2_timezone': p2.timezone,
                        }
                        common_slots.append(slot_data)

        if not common_slots:
            return JsonResponse({'message': 'No common 60-minute slots found.'}, status=404)

        return JsonResponse({'suggested_slots': common_slots})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def summarize_meeting(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are accepted'}, status=405)

    try:

        GOOGLE_API_KEY = "AIzaSyBQ4M-DtlrVJQ2_-ChIDt0yjYC2ZKL_Qgo" 
        genai.configure(api_key=GOOGLE_API_KEY)
        transcript_data = json.loads(request.body)
        transcript = transcript_data.get('transcript')

        if not transcript:
            return JsonResponse({'error': 'Transcript is missing.'}, status=400)

        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = f"""
        You are an expert meeting assistant. Analyze the following meeting transcript between a vendor (Chennai) and a distributor (Germany).
        Your task is to produce a clear, organized set of notes. The notes should include three sections:
        
        1.  **Summary:** A brief, one-paragraph overview of the meeting's purpose and key discussions.
        2.  **Key Decisions:** A bulleted list of all concrete decisions that were made.
        3.  **Action Items:** A bulleted list of all follow-up tasks. For each item, clearly state the task and who is assigned to it (e.g., "Chennai Team:" or "German Distributor:").
        
        Format your entire output in Markdown.
        
        Here is the transcript:
        ---
        {transcript}
        ---
        """
        
        response = model.generate_content(prompt)
        notes_text = response.text

        print("--- GEMINI RAW RESPONSE ---")
        print(notes_text)
        print("--- END OF RAW RESPONSE ---")

        try:
            search_key = 'action items'
            notes_lower = notes_text.lower() # A lowercased version for searching

            if search_key in notes_lower:
                start_index = notes_lower.find(search_key)

                action_items_section = notes_text[start_index:]
                
                for line in action_items_section.strip().split('\n'):
                    if line.strip().startswith('*'):
                        clean_line = line.strip().lstrip('*').strip()
                        if ':' in clean_line:
                            assignee, description = clean_line.split(':', 1)
                            
                            assignee_clean = assignee.replace('**', '').strip()
                            
                            ActionItem.objects.create(
                                assignee=assignee_clean,
                                description=description.strip()
                            )
        except Exception as e:
            print(f"Error parsing action items: {e}")

        return JsonResponse({'notes': response.text})

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def summarize_test_page(request):
    return render(request, 'meetings/summarize_form.html')

def generate_agenda(request):
    """
    API endpoint to automatically generate a meeting agenda using data from
    the database and mock sales files.
    """
    agenda = []

    # --- Define paths to data files ---
    sales_records_path = settings.BASE_DIR / 'data' / 'sales_records.csv'

    try:
        # --- 1. Get PENDING action items from the DATABASE ---
        pending_items = ActionItem.objects.filter(status='Pending')
        for item in pending_items:
            agenda.append(f"Follow-up on pending action item: {item.description} (Assigned to: {item.assignee})")

        # --- 2. Analyze sales data for trends (from CSV) ---
        sales_by_product = {}
        with open(sales_records_path, mode='r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                product, month, licenses = row['product'], row['month'], int(row['licenses_sold'])
                if product not in sales_by_product:
                    sales_by_product[product] = {}
                sales_by_product[product][month] = licenses

        for product, monthly_sales in sales_by_product.items():
            if 'September' in monthly_sales and 'August' in monthly_sales:
                if monthly_sales['September'] < monthly_sales['August']:
                    aug_sales, sept_sales = monthly_sales['August'], monthly_sales['September']
                    agenda.append(f"Discuss performance of '{product}': sales dropped from {aug_sales} to {sept_sales}.")

        # --- 3. Add standard agenda items ---
        if not agenda: # Add a default message if no pending items or sales issues
            agenda.append("No high-priority items found. Discuss new opportunities.")

        agenda.append("Review current promotions and customer feedback")

        return JsonResponse({'generated_agenda': agenda})

    except FileNotFoundError:
        return JsonResponse({'error': 'Sales data file not found.'}, status=500)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@csrf_exempt
def schedule_cal_com_event(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are accepted'}, status=405)

    try:
        # --- CONFIGURATION ---
        CAL_COM_API_KEY = "cal_live_4a85121b813b7cc6fa60f0036f8cc266"
        EVENT_TYPE_ID = 3476740 # REPLACE WITH YOUR REAL EVENT TYPE ID

        data = json.loads(request.body)
        start_time = data['start_utc']
        end_time = data['end_utc']

        api_url = f"https://api.cal.com/v1/bookings?apiKey={CAL_COM_API_KEY}"

        # --- FINAL, CORRECT PAYLOAD STRUCTURE ---
        payload = {
            "eventTypeId": EVENT_TYPE_ID,
            "start": start_time,
            "end": end_time,
            "responses": {
                "email": "test@example.com",
                "name": "AI Meeting Attendee",
                "location": "Google Meet"
            },
            "timeZone": "UTC",
            "language": "en",
            "metadata": {}
        }

        response = requests.post(api_url, json=payload)
        response.raise_for_status()

        return JsonResponse({'status': 'success', 'booking_details': response.json()})

    except Exception as e:
        error_detail = str(e)
        try:
            error_detail = response.json()
        except:
            pass
        return JsonResponse({'error': error_detail}, status=500)
    
@csrf_exempt
def participants_view(request):
    if request.method == 'GET':
        participants = Participant.objects.all()
        data = list(participants.values('id', 'name', 'timezone'))
        return JsonResponse({'participants': data})

    if request.method == 'POST':
        data = json.loads(request.body)
        participant = Participant.objects.create(
            name=data['name'],
            timezone=data['timezone']
        )
        return JsonResponse({'id': participant.id, 'name': participant.name}, status=201)
    
def meeting_test_page(request):
    return render(request, 'meetings/test_form.html')

def summarize_test_page(request):
    return render(request, 'meetings/summarize_form.html')