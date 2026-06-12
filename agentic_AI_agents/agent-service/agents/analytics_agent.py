from crewai import Agent

AnalyticsAgent = Agent(
    role="Learning Analyst",
    goal="Analyze performance trends and timing patterns",
    backstory="A data-driven education analyst",
    verbose=True
)
