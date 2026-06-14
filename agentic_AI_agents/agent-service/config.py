import os
from dotenv import load_dotenv

load_dotenv()

# OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# RAG service
RAG_API_URL = os.getenv("RAG_API_URL")

# Backend (Node.js API)
BACKEND_API_URL = os.getenv("BACKEND_API_URL")

# Service-to-service JWT (NOT a user token)
JWT_TOKEN = os.getenv("AGENT_JWT_TOKEN")
