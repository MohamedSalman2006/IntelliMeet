from django.shortcuts import render
import json
from datetime import datetime
import pytz

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 

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