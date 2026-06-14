from crewai import Task
from agents.mock_exam_agent import MockExamAgent


def build_mock_exam_task(chapter: str):
    return Task(
        description=f"""
Generate a FULL O/L Mathematics mock exam paper.

Chapter: {chapter}

Requirements:
- 20 MCQs
- Four options (A–D)
- One correct answer
- Exam-level difficulty
- Balanced coverage of subtopics
- Suitable for a 40-minute paper

Return format:
- Questions first
- Answers list at the end
""",
        expected_output="""
Return ONLY valid JSON:

{
  "duration_minutes": 40,
  "questions": [
    {
      "question": "string",
      "options": {
        "A": "string",
        "B": "string",
        "C": "string",
        "D": "string"
      },
      "correct_answer": "A | B | C | D"
    }
  ]
}
""",
        agent=MockExamAgent
    )
