from crewai import Task
from agents.quiz_agent import QuizAgent
import uuid

def build_quiz_task(grade, topic, difficulty):
    seed = uuid.uuid4().hex[:6]

    return Task(
        description=f"""
You are a senior Sri Lankan G.C.E. O/L Mathematics examiner.

Generate EXACTLY ONE NUMERICAL MCQ.

GRADE: {grade}
TOPIC: {topic}
DIFFICULTY: {difficulty}/5
UNIQUE SEED: {seed}

STRICT RULES (MUST FOLLOW):
- Question MUST belong ONLY to "{topic}"
- MUST resemble an actual O/L examination question
- MUST use proper mathematical concepts of the topic
- NO generic arithmetic (no random multiplication/addition)
- FOUR options ONLY (A, B, C, D)
- EXACTLY ONE correct answer
- RETURN VALID JSON ONLY (no explanation, no text outside JSON)

JSON FORMAT:
{{
  "question": "Find / Calculate ...",
  "options": {{
    "A": "...",
    "B": "...",
    "C": "...",
    "D": "..."
  }},
  "correct_answer": "A|B|C|D"
}}
""",
        agent=QuizAgent,
        expected_output="VALID JSON ONLY"
    )
