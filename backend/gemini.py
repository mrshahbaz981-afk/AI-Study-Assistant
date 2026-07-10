import os
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Create Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def ask_gemini(question):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"""
You are an AI Study Assistant.

Rules:
- Explain in simple English.
- Keep answers under 150 words unless the user asks for details.
- Use bullet points whenever useful.
- Be accurate and beginner-friendly.
- If the question is about programming, provide code examples.
- If the question is about mathematics, solve it step by step.
- If the question is about science, explain with simple examples.
- Reply naturally to greetings like "Hi" or "Hello".

Question:
{question}
"""
        )

        return response.text

    except Exception as e:
        return f"Error: {str(e)}"