document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('message-form');
    const chatContainer = document.getElementById('chat-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const userInput = document.getElementById('user-input').value;
        if (userInput.trim() !== '') {
            sendMessage(userInput);
            document.getElementById('user-input').value = '';
        }
    });

    function sendMessage(message) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/chat', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const responseData = JSON.parse(xhr.responseText);
                    displayMessage(message, 'user');
                    displayMessage(responseData.message, 'bot');
                }
            }
        };
        xhr.send(`message=${encodeURIComponent(message)}`);
    }

    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});
