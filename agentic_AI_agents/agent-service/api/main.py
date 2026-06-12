import random
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from generators.registry import get_generator
from services.adaptive_quiz_orchestrator import generate_adaptive_question

print("[OK] LOADED agent-service/api/main.py")

app = FastAPI(title="Agentic AI Learning Service")


class QuizRequest(BaseModel):
    grade: int
    topic: str
    difficulty_level: int
    weak_areas: List[str]


class MockExamRequest(BaseModel):
    grade: int


# ─── GRADE TOPIC LISTS ───────────────────────────────────────────

TOPICS_10 = [
    "Perimeter", "Area", "Equations", "Fractions", "Percentages",
    "Arithmetic Progressions", "Probability", "Sets", "Logarithms",
    "Triangles", "Algebraic Fractions", "Graphs",
    "Surface Area And Volume", "Binomial Expressions",
    "Factors Of Quadratic Expressions", "Scale Diagrams",
]

TOPICS_11 = [
    "Pythagoras's Theorem", "Trigonometry", "Matrices",
    "Geometric Progressions", "Equations", "Percentages",
    "Indices And Logarithms", "Surface Area Of Solids",
    "Volume Of Solids", "Probability", "Cyclic Quadrilaterals",
    "Sets", "Share Market", "Real Numbers",
]


@app.post("/generate-quiz")
def generate_quiz(payload: QuizRequest):
    generator = get_generator(payload.grade, payload.topic)
    question = generator(payload.difficulty_level)
    return {"questions": [question]}


@app.post("/generate-adaptive-quiz")
def generate_adaptive_quiz(payload: dict):
    return generate_adaptive_question(
        grade=payload["grade"],
        topic=payload["topic"],
        analytics=payload["analytics"],
        current_difficulty=payload["current_difficulty"]
    )


@app.post("/generate-mock-exam")
def generate_mock_exam(payload: MockExamRequest):
    """
    Generate a mock exam with 5 essay questions (one per random topic).
    Returns structured multi-part questions with model answers.
    """
    grade = payload.grade

    if grade == 10:
        from generators.mock_exam.grade10_essay import ESSAY_GENERATORS_10 as registry
        pool = TOPICS_10
    elif grade == 11:
        from generators.mock_exam.grade11_essay import ESSAY_GENERATORS_11 as registry
        pool = TOPICS_11
    else:
        return {"error": f"Unsupported grade: {grade}"}

    # Pick 5 unique topics that have an essay generator
    available = [t for t in pool if t in registry]
    chosen = random.sample(available, min(5, len(available)))

    questions = []
    for i, topic in enumerate(chosen, start=1):
        try:
            q = registry[topic]()
            q["question_number"] = i
            questions.append(q)
        except Exception as e:
            questions.append({
                "question_number": i,
                "topic": topic,
                "error": str(e),
                "parts": [],
                "total_marks": 0,
            })

    return {
        "grade": grade,
        "duration_minutes": 60,
        "total_marks": sum(q.get("total_marks", 0) for q in questions),
        "questions": questions,
    }

