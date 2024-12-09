class ChatManager {
      constructor() {
        this.messages = [];
      }
      
      createMessage(text, sender) {
        const message = {
          id: this.messages.length + 1,
          text,
          sender,
          timestamp: new Date().toLocaleTimeString()
        };
        this.messages.push(message);
        this.renderMessages();
      }
      
      readMessages() {
        return this.messages;
      }
      
      updateMessage(id, text) {
        const messageIndex = this.messages.findIndex(message => message.id === id);
        if (messageIndex!== -1) {
          this.messages[messageIndex].text = text;
          this.renderMessages();
        }
      }
      
      deleteMessage(id) {
        const messageIndex = this.messages.findIndex(message => message.id === id);
        if (messageIndex!== -1) {
          this.messages.splice(messageIndex, 1);
          this.renderMessages();
        }
      }
      
      renderMessages() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.innerHTML = '';
        this.messages.forEach(message => {
          const messageElement = document.createElement('li');
          messageElement.classList.add('flex', message.sender === 'user'? 'justify-end' : 'justify-start', 'mb-2');
          const messageBubble = document.createElement('div');
          messageBubble.classList.add('bg-blue-100', 'p-2', 'rounded', 'max-w-xs');
          const messageText = document.createElement('p');
          messageText.textContent = message.text;
          const senderName = document.createElement('small');
          senderName.classList.add('text-xs', 'text-gray-500');
          senderName.textContent = message.sender === 'user'? 'User' : 'Assistant';
          const timestamp = document.createElement('span');
          timestamp.classList.add('text-xs', 'text-gray-500', 'ml-2');
          timestamp.textContent = message.timestamp;
          messageBubble.appendChild(senderName);
          messageBubble.appendChild(messageText);
          messageBubble.appendChild(timestamp);
          messageElement.appendChild(messageBubble);
          chatWindow.appendChild(messageElement);
        });
      }
    }
    
    const chatManager = new ChatManager();
    
    // Sample Messages
    chatManager.createMessage('Hello!', 'user');
    chatManager.createMessage('Hi there!', 'other');
    chatManager.createMessage('How are you?', 'user');
    
    // Event Listener for Send Button
    document.getElementById('send-button').addEventListener('click', () => {
      const messageInput = document.getElementById('message-input');
      const messageText = messageInput.value.trim();
      if (messageText) {
        chatManager.createMessage(messageText, 'user');
        messageInput.value = '';
      }
    });
