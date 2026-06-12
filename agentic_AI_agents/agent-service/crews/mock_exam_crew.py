from crewai import Crew
from tasks.mock_exam_task import build_mock_exam_task


def build_mock_exam_crew(chapter: str):
    task = build_mock_exam_task(chapter)

    return Crew(
        agents=[task.agent],
        tasks=[task],
        verbose=True
    )
