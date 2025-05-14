import { ChromeAI } from "@langchain/community/experimental/llms/chrome_ai";

const model = new ChromeAI({
  temperature: 0.5,
  topK: 40,
});

const chatContainer = document.getElementById('result');
const promptInput = document.getElementById('prompt-input');
const sendButton = document.getElementById('send-message');

// Function to add a message to the chat
function addMessageToChat(content, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
  messageDiv.textContent = content;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to handle sending a message
async function handleSendMessage() {
  const userPrompt = promptInput.value.trim();

  if (!userPrompt) return;

  // Add user message to chat
  addMessageToChat(userPrompt, 'user');

  // Clear input
  promptInput.value = '';

  // Create a temporary message for "thinking" state
  const loadingDiv = document.createElement('div');
  loadingDiv.classList.add('message', 'ai-message');
  loadingDiv.textContent = 'Thinking...';
  chatContainer.appendChild(loadingDiv);

  try {
    // Get AI response
    const response = await model.invoke(userPrompt);

    // Replace loading message with actual response
    loadingDiv.textContent = response;
  } catch (error) {
    // Show error in the AI message
    loadingDiv.textContent = `Error: ${error.message}`;
  }

  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Event listeners
sendButton.addEventListener('click', handleSendMessage);

// Allow sending with Enter key (Shift+Enter for new line)
promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
});

// Initialize with a greeting
window.addEventListener('load', () => {
  addMessageToChat('Hello! I\'m an AI assistant powered by ChromeAI and LangChain. How can I help you today?', 'ai');
});
