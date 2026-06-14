from crewai import Task
from agents.tutor_agent import TutorAgent

def build_tutor_feedback_task(question, selected, correct):
    return Task(
        description=f"""
A student answered a question incorrectly.

Question:
{question}

Student Answer: {selected}
Correct Answer: {correct}

Explain:
1. Why the student's answer is wrong
2. The correct method
3. A simple tip to avoid this mistake

Explain simply for an O/L student.
""",
        expected_output="""
{
  "mistake_explanation": "string",
  "correct_method": "string",
  "exam_tip": "string"
}
""",
        agent=TutorAgent
    )
