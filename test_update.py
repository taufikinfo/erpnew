import requests
import json

# Test ticket update
url = "http://localhost:8000/api/v1/tickets/d3f10494-1fb2-4618-b66e-b814850b7b2f"
data = {
    "description": "Updated description for testing"
}

headers = {
    "Content-Type": "application/json"
}

response = requests.put(url, json=data, headers=headers)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
