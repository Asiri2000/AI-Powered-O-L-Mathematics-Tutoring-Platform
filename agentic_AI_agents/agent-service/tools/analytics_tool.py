import requests
from config import BACKEND_API_URL, JWT_TOKEN


def get_diagnosis_data(user_id: str, chapter: str):
    url = f"{BACKEND_API_URL}/api/analytics/chapters/{user_id}"

    headers = {
        "Authorization": f"Bearer {JWT_TOKEN}"
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()

    data = response.json()

    for item in data:
        if item["chapter"] == chapter:
            return item

    return {"message": "No data found for this chapter"}


#ADD THIS FUNCTION
def fetch_user_analytics(user_id: str):
    """
    Fetch all chapter analytics for a user
    """
    url = f"{BACKEND_API_URL}/api/analytics/chapters/{user_id}"

    headers = {
        "Authorization": f"Bearer {JWT_TOKEN}"
    }

    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()
