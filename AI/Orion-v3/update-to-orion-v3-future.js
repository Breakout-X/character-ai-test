// I may or may not use this.
function sanitizeHTML(html) {
    var div = document.createElement('div');
    div.innerHTML = html;

    var whitelist = ['br', 'strong', 'img', 'canvas', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'script'];
    var elements = div.getElementsByTagName('*'); // Gets all elements

    for (var i = 0; i < elements.length; i++) {
        if (whitelist.indexOf(elements[i].tagName.toLowerCase()) === -1) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }

    return div.innerHTML;
}

function updateChatbox(message, sender) {
    if (sender == 'orion') {
        var sanitizedMessage = sanitizeHTML(message);
        chatbox.innerHTML += `<div class="${sender}">${sanitizedMessage}</div>`;
    } else {
        chatbox.insertAdjacentHTML('beforeend', `<div class="${sender}"></div>`);
        chatbox.lastElementChild.textContent = message;
    }
    input.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
}
