import os
from dotenv import load_dotenv
load_dotenv()

from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in .env")

# Embeddings
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
    api_key=OPENAI_API_KEY
)

# LLM
llm = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0
)

def create_store(docs):
    store = FAISS.from_documents(docs, embeddings)
    store.save_local("faiss_index")
    print("Vector store created and saved locally.")

def search_store(query: str, k: int = 5):
    if not os.path.exists("faiss_index"):
        raise ValueError("FAISS index not found. Run ingest first.")

    store = FAISS.load_local(
        "faiss_index",
        embeddings,
        allow_dangerous_deserialization=True
    )

    retriever = store.as_retriever(search_kwargs={"k": k})
    docs = retriever.invoke(query)

    context = "\n\n".join(d.page_content for d in docs)

    prompt = ChatPromptTemplate.from_template(
        """
        Use the following context to answer the question.
        If the answer is not in the context, say "I don't know".

        Context:
        {context}

        Question:
        {question}
        """
    )

    chain = prompt | llm
    result = chain.invoke(
        {"context": context, "question": query}
    )

    return result.content, docs
