import requests
from config import RAG_API_URL

def rag_query(question: str) -> str:
    """
    Query the textbook RAG service for syllabus-based answers.
    """
    response = requests.post(
        RAG_API_URL,
        json={"query": question}
    )
    response.raise_for_status()
    return response.json()["answer"]

RAG_TOOL = {
    "name": "RAG Query Tool",
    "description": "Query the textbook RAG service for accurate explanations",
    "func": rag_query
}
