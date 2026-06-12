from crewai import Agent

TutorAgent = Agent(
    role="AI Tutor",
    goal="Explain student mistakes clearly and correct misconceptions",
    backstory="A patient O/L mathematics tutor",
    verbose=True
)
