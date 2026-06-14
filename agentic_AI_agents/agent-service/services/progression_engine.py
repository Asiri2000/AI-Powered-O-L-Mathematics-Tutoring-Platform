def determine_learning_stage(accuracy, attempts):
    if attempts < 5:
        return "BEGINNER"
    if accuracy < 0.5:
        return "BEGINNER"
    if accuracy < 0.65:
        return "PRACTICING"
    if accuracy < 0.8:
        return "PROFICIENT"
    return "EXAM_READY"
