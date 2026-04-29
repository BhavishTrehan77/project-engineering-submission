
const messages = [];

const chatDisplay = document.getElementById('chatDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

function renderMessage(role, content) {
  const div = document.createElement('div');
  div.classList.add('message', role);
  div.textContent = content;
  chatDisplay.appendChild(div);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

async function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  // User message
  messages.push({ role: "user", content: text });
  renderMessage("user", text);
  messageInput.value = "";

  // Temporary loading message
  renderMessage("assistant", "Typing...");

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();
    console.log("Frontend received:", data);

    // Remove "Typing..."
    chatDisplay.lastChild.remove();

    const aiReply = data.reply || "No response";

    messages.push({ role: "assistant", content: aiReply });
    renderMessage("assistant", aiReply);

  } catch (error) {
    console.error("Frontend error:", error);
    chatDisplay.lastChild.remove();
    renderMessage("assistant", "Error connecting to server");
  }
}

sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});
