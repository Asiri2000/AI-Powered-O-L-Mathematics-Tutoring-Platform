from fastapi import FastAPI
from pydantic import BaseModel
from ingest import ingest_pdf
from vector_store import search_store
from typing import List

app = FastAPI(title="RAG Service")

# Request body model
class QueryRequest(BaseModel):
    query: str

# Response model
class RetrieveResponse(BaseModel):
    answer: str
    context: List[str]  # list of text from top documents

@app.on_event("startup")
def startup_event():
    """
    Ingest PDF and create FAISS vector store on startup
    (skips if index already exists)
    """
    import os
    if os.path.exists("faiss_index/index.faiss"):
        print("FAISS index already exists – skipping PDF ingestion.")
        return
    pdf_path = "grade10_11_math.pdf"
    ingest_pdf(pdf_path)
    print(f"PDF '{pdf_path}' ingested successfully.")

@app.post("/retrieve", response_model=RetrieveResponse)
def retrieve(request: QueryRequest):
    """
    Retrieve relevant content and generate answer using RAG
    """
    answer, docs = search_store(request.query)
    context = [d.page_content for d in docs]  # safe because docs are Document objects
    return {"answer": answer, "context": context}
