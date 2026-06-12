def decide_next_action(stage):
    if stage == "BEGINNER":
        return "REVISE"
    if stage in ["PRACTICING", "PROFICIENT"]:
        return "ADAPTIVE_QUIZ"
    return "MOCK_EXAM"
