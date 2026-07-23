import os
import time
from dotenv import load_dotenv
from google import genai


# Load environment variables
load_dotenv()

# Create Gemini client
api_key = os.getenv("GEMINI_API_KEY")
print("API KEY FOUND:", api_key is not None)
print("API KEY PREFIX:", api_key[:10] if api_key else "None")

client = genai.Client(api_key=api_key)

def ask_gemini(question):

    for attempt in range(2):   # 1 normal try + 1 retry

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

            error = str(e)

            # Retry once if Gemini is temporarily overloaded
            if "503" in error and attempt == 0:
                time.sleep(2)
                continue

            if "503" in error:
                return "⚠️ AI server is currently busy due to high demand. Please wait a few seconds and try again."

            return f"Error: {error}"