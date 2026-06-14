from openai import OpenAI
from config import OPENAI_API_KEY
from prompts.remediation_prompt import build_remediation_prompt

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_remediation(chapter: str, analytics: dict):
    prompt = build_remediation_prompt(chapter, analytics)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a patient mathematics tutor."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.4
    )

    return response.choices[0].message.content
