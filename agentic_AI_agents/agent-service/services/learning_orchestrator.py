def orchestrate_learning(analytics, current_difficulty):
    accuracy = analytics.get("accuracy", 0)

    if accuracy >= 0.8:
        return {
            "action": "NEXT_QUIZ",
            "difficulty": min(current_difficulty + 1, 5)
        }

    if accuracy < 0.5:
        return {
            "action": "REVISE",
            "difficulty": max(current_difficulty - 1, 1)
        }

    return {
        "action": "QUIZ",
        "difficulty": current_difficulty
    }
