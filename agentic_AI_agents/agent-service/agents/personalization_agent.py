from crewai import Agent

PersonalizationAgent = Agent(
    role="Personalized Learning Designer",
    goal="Create adaptive quizzes targeting weak areas",
    backstory="An expert in mastery-based learning",
    verbose=True
)
