from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add the parent directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import your actual app
from main import api as ai_app

# Create handler for Vercel
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount your AI app
app.mount("/", ai_app)

# Handler for Vercel serverless function
@app.get("/api/health")
def health_check():
    return {"status": "ok"}

# For local development
if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=8000, reload=True)