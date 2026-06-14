from crewai import Crew, Task
from agents.diagnosis_agent import DiagnosisAgent

def build_learning_crew(user_id: str, chapter: str, analytics_summary: dict):

    diagnosis_task = Task(
        description=(
            f"The student is studying '{chapter}'. "
            f"Here is their performance data:\n\n"
            f"{analytics_summary}\n\n"
            "Analyze the student's weaknesses, common mistakes, "
            "and explain what they should focus on next in simple language."
        ),
        expected_output=(
            "A clear diagnosis of mistakes, misconceptions, "
            "and learning recommendations."
        ),
        agent=DiagnosisAgent
    )

    crew = Crew(
        agents=[DiagnosisAgent],
        tasks=[diagnosis_task],
        verbose=True
    )

    return crew
