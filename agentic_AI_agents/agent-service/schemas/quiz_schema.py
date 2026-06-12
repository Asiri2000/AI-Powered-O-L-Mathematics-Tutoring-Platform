from pydantic import BaseModel
from typing import Dict, List


class MCQ(BaseModel):
    question: str
    options: Dict[str, str]
    correct_answer: str
    explanation: str
    difficulty: int


class QuizResult(BaseModel):
    user_id: str
    chapter: str
    difficulty_level: int
    accuracy: float
    avg_time: float
    weak_areas: List[str]
