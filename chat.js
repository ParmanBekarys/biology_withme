document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    
    // Track conversation history
    const messages = [
        { role: "system", content: "You are a helpful biology assistant who can answer questions about biology in Kazakh language." },
        { role: "assistant", content: "Сәлем! Мен Biology Assistant-пін. Биология бойынша сұрақтарыңызға жауап беремін." }
    ];
    
    // Function to add a message to the chat UI
    function addMessage(content, isUser) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'ai-message');
        messageElement.textContent = content;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('typing-indicator');
        indicator.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('typing-dot');
            indicator.appendChild(dot);
        }
        
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    // Function to send message to API
    async function sendMessage(userMessage) {
        try {
            // Add user message to messages array
            messages.push({ role: "user", content: userMessage });
            
            // Show typing indicator
            showTypingIndicator();
            
            // Send API request
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: messages })
            });
            
            // Check if response is ok
            if (!response.ok) {
                throw new Error('API request failed');
            }
            
            const data = await response.json();
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Get assistant response
            const assistantResponse = data.choices[0].message.content;
            
            // Add assistant message to UI
            addMessage(assistantResponse, false);
            
            // Add assistant message to messages array
            messages.push({ role: "assistant", content: assistantResponse });
            
        } catch (error) {
            console.error('Error:', error);
            removeTypingIndicator();
            addMessage('Кешіріңіз, қате орын алды. Қайталап көріңіз.', false);
        }
    }
    
    // Event listeners
    sendBtn.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            sendMessage(message);
        }
    });
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                addMessage(message, true);
                userInput.value = '';
                sendMessage(message);
            }
        }
    });
});