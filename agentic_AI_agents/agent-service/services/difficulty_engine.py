def adjust_difficulty(current_level, accuracy, avg_time):
    if accuracy >= 0.8 and avg_time <= 60:
        return min(current_level + 1, 5)
    if accuracy < 0.5:
        return max(current_level - 1, 1)
    return current_level
