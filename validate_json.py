import re
import json

with open(r'c:\Users\C2k\Documents\antigravity\delightful-nobel\spec.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract pre content
match = re.search(r'<pre>(.*?)</pre>', html, re.DOTALL)
if match:
    json_text = match.group(1).strip()
    data = json.loads(json_text)
    print("SUCCESS: JSON extracted directly from <pre> in spec.html is 100% valid!")
    print(f"Itinerary: {data['itineraryId']}")
    print(f"Nights: {data['dates']['nights']} (Check-in: {data['dates']['checkIn']}, Check-out: {data['dates']['checkOut']})")
    print(f"Stay nights: {data['stay']['nights']}")
    print(f"Experience days: {len(data['experience']['dayByDayPlan'])}")
    print(f"Food slot: {data['food']['reservationSlot']}")
else:
    print("ERROR: <pre> not found!")
