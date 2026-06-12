from crewai import Agent

QuizAgent = Agent(
    role="Sri Lankan GCE O/L Mathematics Examiner",
    goal="Generate ONE syllabus-accurate numerical MCQ",
    backstory="""
You strictly follow the Sri Lankan GCE O/L syllabus.
You NEVER generate off-topic questions.
""",
    verbose=True,
    memory=False,
    allow_delegation=False
)
