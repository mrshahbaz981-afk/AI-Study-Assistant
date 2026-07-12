
// ===============================
// Elements
// ===============================

const question = document.getElementById("question");
const sendBtn = document.getElementById("sendBtn");
const clearInputBtn = document.getElementById("clearInputBtn");

const chatMessages = document.getElementById("chatMessages");
const chatContainer = document.getElementById("chatContainer");

const typingIndicator = document.getElementById("typingIndicator");
const welcomeScreen = document.getElementById("welcomeScreen");

const historyList = document.getElementById("historyList");
const newChatBtn = document.getElementById("newChatBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const themeBtn = document.getElementById("themeBtn");

const scrollBottomBtn =
document.getElementById("scrollBottomBtn");

// ===============================
// Backend
// ===============================

const API_URL = "http://ai-study-assistant-env.eba-68yugnrn.ap-south-1.elasticbeanstalk.com/ask";

console.log("API_URL =", API_URL);

// ===============================
// Variables
// ===============================

let chats = [];
let currentChat = [];
let currentIndex = -1;

// ===============================
// Init
// ===============================

loadTheme();
loadHistory();
autoResize();

question.focus();

// ===============================
// Events
// ===============================

sendBtn.addEventListener("click", sendMessage);

question.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        sendMessage();

    }

});

question.addEventListener("input", autoResize);

clearInputBtn.addEventListener("click", () => {

    question.value = "";

    autoResize();

    question.focus();

});

newChatBtn.addEventListener("click", startNewChat);

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("hide");

});

themeBtn.addEventListener("click", toggleTheme);

scrollBottomBtn.addEventListener("click", scrollBottom);

clearHistoryBtn.addEventListener("click", () => {

    deleteModal.classList.remove("hidden");

});

cancelDelete.addEventListener("click", () => {

    deleteModal.classList.add("hidden");

});

confirmDelete.addEventListener("click", clearHistory);// ===============================
// Send Message
// ===============================

async function sendMessage() {

    const text = question.value.trim();

    if (!text) return;

    welcomeScreen.style.display = "none";

    addMessage("user", text);

    currentChat.push({
        role: "user",
        text: text
    });

    question.value = "";

    autoResize();

    typingIndicator.classList.remove("hidden");

    scrollBottom();

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: text
            })

        });

        if (!response.ok) {

            throw new Error("Server Error");

        }

        const data = await response.json();

        typingIndicator.classList.add("hidden");

        addMessage("ai", data.answer);

        currentChat.push({
            role: "ai",
            text: data.answer
        });

        saveCurrentChat();

    }

    catch (error) {

        typingIndicator.classList.add("hidden");

        addMessage(
            "ai",
            "❌ Unable to connect to backend. Please make sure FastAPI server is running."
        );

        console.error(error);

    }

}

// ===============================
// Add Message
// ===============================

function addMessage(role, text) {

    const message = document.createElement("div");

    message.className = `message ${role}`;

    const avatar = document.createElement("div");

    avatar.className = "avatar";

    avatar.innerHTML = role === "user"
        ? `<i class="fa-solid fa-user"></i>`
        : `<i class="fa-solid fa-robot"></i>`;

    const content = document.createElement("div");

    content.className = "message-content";

if (role === "ai") {

    content.innerHTML = marked.parse(text);

    content.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });

    const copyBtn = document.createElement("button");

    copyBtn.className = "copy-btn";

    copyBtn.innerHTML =
        '<i class="fa-regular fa-copy"></i> Copy';

    copyBtn.onclick = async () => {

        await navigator.clipboard.writeText(text);

        copyBtn.innerHTML =
            '<i class="fa-solid fa-check"></i> Copied';

        setTimeout(() => {

            copyBtn.innerHTML =
            '<i class="fa-regular fa-copy"></i> Copy';

        },2000);

    };

    content.appendChild(copyBtn);

}
else{

    content.textContent = text;

}

message.appendChild(avatar);
message.appendChild(content);
chatMessages.appendChild(message);

    scrollBottom();

}// ===============================
// Chat History
// ===============================

function saveCurrentChat() {

    if (currentChat.length === 0) return;

    if (currentIndex === -1) {

        chats.unshift({

            title: currentChat[0].text.substring(0, 35),

            messages: [...currentChat]

        });

    } else {

        chats[currentIndex].messages = [...currentChat];

    }

    localStorage.setItem(
        "ai-study-history",
        JSON.stringify(chats)
    );

    renderHistory();

}

function renderHistory() {

    historyList.innerHTML = "";

    chats.forEach((chat, index) => {

        const item = document.createElement("div");

        item.className = "history-item";

        if (index === currentIndex) {

            item.classList.add("active");

        }

        item.textContent = chat.title;

        item.onclick = () => {

            openChat(index);

        };

        historyList.appendChild(item);

    });

}

function openChat(index) {

    currentIndex = index;

    currentChat = [...chats[index].messages];

    chatMessages.innerHTML = "";

    welcomeScreen.style.display = "none";

    currentChat.forEach(msg => {

        addMessage(msg.role, msg.text);

    });

    renderHistory();

}

function startNewChat() {

    currentChat = [];

    currentIndex = -1;

    chatMessages.innerHTML = "";

    welcomeScreen.style.display = "block";

    question.value = "";

    autoResize();

    renderHistory();

}

function loadHistory() {

    const saved = localStorage.getItem(
        "ai-study-history"
    );

    if (saved) {

        chats = JSON.parse(saved);

        renderHistory();

    }

}

function clearHistory() {

    chats = [];

    currentChat = [];

    currentIndex = -1;

    localStorage.removeItem(
        "ai-study-history"
    );

    chatMessages.innerHTML = "";

    historyList.innerHTML = "";

    welcomeScreen.style.display = "block";

    deleteModal.classList.add("hidden");

}// ===============================
// Theme
// ===============================

function toggleTheme() {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "ai-theme",
        isLight ? "light" : "dark"
    );

    updateThemeButton();

}

function loadTheme() {

    const theme =
        localStorage.getItem("ai-theme");

    if (theme === "light") {

        document.body.classList.add("light");

    }

    updateThemeButton();

}

function updateThemeButton() {

    const icon =
        themeBtn.querySelector("i");

    const text =
        themeBtn.querySelector("span");

    if (document.body.classList.contains("light")) {

        icon.className = "fa-solid fa-sun";

        text.textContent = "Light Mode";

    } else {

        icon.className = "fa-solid fa-moon";

        text.textContent = "Dark Mode";

    }

}

// ===============================
// Helpers
// ===============================

function autoResize() {

    question.style.height = "auto";

    question.style.height =
        question.scrollHeight + "px";

}

function scrollBottom() {

    chatContainer.scrollTo({

        top: chatContainer.scrollHeight,

        behavior: "smooth"

    });

}

// ===============================
// Suggestion Cards
// ===============================

document.querySelectorAll(".suggestion-card")
.forEach(card => {

    card.addEventListener("click", () => {

        question.value =
            card.textContent.trim();

        autoResize();

        question.focus();

    });

});

// ===============================
// Close Modal
// ===============================

window.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        deleteModal.classList.add("hidden");

    }

});

// ===============================
// Sidebar Responsive
// ===============================

window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {

        sidebar.classList.remove("hide");

    }

});

// ===============================
// Initial Scroll
// ===============================

scrollBottom();