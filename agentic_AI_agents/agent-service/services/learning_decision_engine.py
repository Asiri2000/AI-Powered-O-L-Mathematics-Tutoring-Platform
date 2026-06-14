def decide_next_action(accuracy: float):
    """
    Decide next learning action.
    """

    if accuracy < 0.5:
        return "REVISE"

    elif accuracy < 0.75:
        return "QUIZ"

    return "MOCK_EXAM"
0