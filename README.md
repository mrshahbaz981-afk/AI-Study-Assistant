# AI Study Assistant

AI Study Assistant is a web application that helps students get quick answers to their academic questions using Google's Gemini AI. Users can type their questions, and the application generates easy-to-understand responses in real time.

This project was built as part of my learning journey in Full Stack Development, Generative AI, and Cloud Deployment.

---

## 🚀 Live Demo

**Website:**
https://mrshahbaz981-afk.github.io/AI-Study-Assistant/

> **Note:** The current version is optimized for desktop and laptop screens. Mobile responsiveness will be added in future updates.

---

## ✨ Features

* Ask study-related questions
* AI-generated responses using Google Gemini
* Clean and simple user interface
* Markdown-supported answers
* FastAPI backend with REST API
* Secure API key management using environment variables
* Frontend hosted on GitHub Pages
* Backend deployed on AWS Elastic Beanstalk

---

## 🛠️ Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Python
* FastAPI
* Uvicorn

**AI**

* Google Gemini API

**Deployment**

* GitHub Pages
* AWS Elastic Beanstalk

**Version Control**

* Git & GitHub

---

## 📁 Project Structure

```text
AI-Study-Assistant/
│
├── backend/
│   ├── main.py
│   ├── gemini.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

## ⚙️ How to Run Locally

1. Clone the repository.

```bash
git clone https://github.com/mrshahbaz981-afk/AI-Study-Assistant.git
```

2. Open the project folder.

3. Install the required Python packages.

```bash
pip install -r requirements.txt
```

4. Create a `.env` file inside the `backend` folder and add your Gemini API key.

```env
GEMINI_API_KEY=YOUR_API_KEY
```

5. Start the FastAPI server.

```bash
uvicorn main:app --reload
```

6. Open the frontend in your browser and start asking questions.

---

## 📸 Screenshots

### Home Page

*(Add screenshot here)*

### AI Response

*(Add screenshot here)*

---

## 🔮 Future Improvements

* Mobile responsive design
* PDF upload support
* Voice input
* Quiz generation
* Notes generation

---

## 👨‍💻 Author

**Shahbaz**

B.Tech Student

---

If you like this project, feel free to give it a ⭐ on GitHub.
