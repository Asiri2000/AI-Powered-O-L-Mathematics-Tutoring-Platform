from crewai import Crew
from tasks.tutor_feedback_task import build_tutor_feedback_task

def build_tutor_feedback_crew(question, selected, correct):
    task = build_tutor_feedback_task(
        question, selected, correct
    )

    return Crew(
        agents=[task.agent],
        tasks=[task],
        verbose=True
    )
