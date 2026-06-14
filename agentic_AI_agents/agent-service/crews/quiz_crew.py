from crewai import Crew
from tasks.quiz_task import build_quiz_task

def build_quiz_crew(grade, topic, difficulty_level, weak_areas):
    task = build_quiz_task(grade, topic, difficulty_level)

    return Crew(
        agents=[task.agent],
        tasks=[task],
        verbose=True
    )
