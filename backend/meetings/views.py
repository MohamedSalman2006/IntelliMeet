from django.shortcuts import render
import json
from datetime import datetime
import pytz
import os
import google.generativeai as genai
import csv

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
from django.conf import settings
from .models import ActionItem

def get_action_items(request):
    try:
        items = ActionItem.objects.all().order_by('-created_at')
        data = list(items.values('id', 'description', 'assignee', 'status', 'created_at'))
        return JsonResponse({'action_items': data})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def find_common_slots(loc1_name, loc1_data, loc2_name, loc2_data, meeting_duration_minutes=60):
    loc1_tz = pytz.timezone(loc1_data['timezone'])
    loc2_tz = pytz.timezone(loc2_data['timezone'])

    loc1_slots_utc = []
    for slot in loc1_data['free_slots']:
        start = loc1_tz.localize(datetime.fromisoformat(slot['start'])).astimezone(pytz.utc)
        end = loc1_tz.localize(datetime.fromisoformat(slot['end'])).astimezone(pytz.utc)
        loc1_slots_utc.append({'start': start, 'end': end})

    loc2_slots_utc = []
    for slot in loc2_data['free_slots']:
        start = loc2_tz.localize(datetime.fromisoformat(slot['start'])).astimezone(pytz.utc)
        end = loc2_tz.localize(datetime.fromisoformat(slot['end'])).astimezone(pytz.utc)
        loc2_slots_utc.append({'start': start, 'end': end})

    common_slots = []
    for c_slot in loc1_slots_utc:
        for g_slot in loc2_slots_utc:
            overlap_start = max(c_slot['start'], g_slot['start'])
            overlap_end = min(c_slot['end'], g_slot['end'])

            if overlap_start < overlap_end:
                duration_seconds = (overlap_end - overlap_start).total_seconds()
                if duration_seconds >= meeting_duration_minutes * 60:
                    common_slots.append({
                        'start_utc': overlap_start.isoformat(),
                        'end_utc': overlap_end.isoformat(),
                        f'start_{loc1_name}': overlap_start.astimezone(loc1_tz).isoformat(),
                        f'end_{loc1_name}': overlap_end.astimezone(loc1_tz).isoformat(),
                        f'start_{loc2_name}': overlap_start.astimezone(loc2_tz).isoformat(),
                        f'end_{loc2_name}': overlap_end.astimezone(loc2_tz).isoformat()
                    })
    
    return common_slots

@csrf_exempt
def suggest_meeting_slots(request):
    
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are accepted'}, status=405)

    try:
       
        data = json.loads(request.body)
      
        loc1_name = data['loc1']['name']
        loc1_cal_data = data['loc1']['calendar']
        
        loc2_name = data['loc2']['name']
        loc2_cal_data = data['loc2']['calendar']
   
        duration = data.get('duration_minutes', 60)

        common_slots = find_common_slots(loc1_name, loc1_cal_data, loc2_name, loc2_cal_data, duration)

        if not common_slots:
            return JsonResponse({'message': 'No common slots found.'}, status=404)

        return JsonResponse({'suggested_slots': common_slots})

    except (json.JSONDecodeError, KeyError) as e:
        return JsonResponse({'error': f'Invalid JSON format or missing key: {e}'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def meeting_test_page(request):
    return render(request, 'meetings/test_form.html')

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