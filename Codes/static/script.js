document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            addMessage('You', message);
            fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `user_input=${encodeURIComponent(message)}`
            })
            .then(response => response.json())
            .then(data => {
                addMessage('Therapist', data.response);
            })
            .catch(error => console.error('Error:', error));
            userInput.value = '';
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${sender}: </strong>${message}<br><br>`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
