from sqlalchemy import create_engine, text
from config import DATABASE_URL

engine = create_engine(DATABASE_URL)

def save_quiz_attempt(data: dict):
    query = text("""
        INSERT INTO quiz_attempts 
        (user_id, question_id, answer, correct, time_taken, chapter)
        VALUES (:user_id, :question_id, :answer, :correct, :time_taken, :chapter)
    """)
    with engine.begin() as conn:
        conn.execute(query, data)
