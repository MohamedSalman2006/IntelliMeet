from django.shortcuts import render
import json
from datetime import datetime
import pytz
import os
import google.generativeai as genai

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
from .models import ActionItem

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
                                description=description.replace('**', '').strip()
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