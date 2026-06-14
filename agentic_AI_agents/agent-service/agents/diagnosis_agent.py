from crewai import Agent

DiagnosisAgent = Agent(
    role="Error Analyst",
    goal="Analyze student mistakes and explain misconceptions clearly",
    backstory=(
        "An expert math tutor who diagnoses student weaknesses "
        "based on performance summaries provided."
    ),
    verbose=True
)
