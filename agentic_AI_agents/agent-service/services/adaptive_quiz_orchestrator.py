from services.difficulty_engine import adjust_difficulty
from services.learning_orchestrator import orchestrate_learning
from services.progression_engine import determine_learning_stage
from generators.registry import get_generator

def generate_adaptive_question(
    grade: int,
    topic: str,
    analytics: dict,
    current_difficulty: int
):
    """
    analytics = {
        "accuracy": 0.72,
        "avg_time": 48,
        "attempts": 7
    }
    """

    # 1️⃣ Determine mastery stage
    mastery_stage = determine_learning_stage(
        accuracy=analytics.get("accuracy", 0),
        attempts=analytics.get("attempts", 0)
    )

    # 2️⃣ Adjust difficulty numerically
    adjusted_difficulty = adjust_difficulty(
        current_level=current_difficulty,
        accuracy=analytics.get("accuracy", 0),
        avg_time=analytics.get("avg_time", 999)
    )

    # 3️⃣ Decide learning action
    decision = orchestrate_learning(
        analytics=analytics,
        current_difficulty=adjusted_difficulty
    )

    # 4️⃣ Get correct generator from registry
    generator = get_generator(grade, topic)

    # 5️⃣ Generate the question
    question = generator(
        grade=grade,
        topic=topic,
        difficulty=decision["difficulty"]
    )

    return {
        "action": decision["action"],
        "mastery_stage": mastery_stage,
        "difficulty": decision["difficulty"],
        "question": question
    }
