/*Orion-v2.js
Legacy version. dont use.
*/

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var chatbox = document.getElementById('chatbox');
var input = document.getElementById('input');
var restrictedMode = false; // Default value
var chatDisabled = false; // Default value

try { 
    swearWords; // Block these
    innapropriateWords; // Block these
    sensitiveWords; // Block these on restricted mode only
    reallyBadWords; // Block these and ban
    allBadWords; // Don't use
} catch (e) {
    console.error("Could not load badwords.js content. Replacing with placeholders");
    swearWords = []; // Block these
    innapropriateWords = []; // Block these
    sensitiveWords = []; // Block these on restricted mode only
    reallyBadWords = []; // Block these and ban
    allBadWords = []; // Don't use
    chatDisabled = true;
    updateChatbox('Oops, something went wrong. Please try refreshing the page.', 'bot');
}

// Send Message function
window.sendMessage = function() {
    try {
        const message = input.value.trim().toLowerCase();
        if(message !== '') {
            if(swearWords.some(word => message.includes(word))) {
                updateChatbox(input.value, 'user');
                updateChatbox('Hmm, something went wrong. Shall we move on to a different topic.', 'bot');
                return;
            }
            if(innapropriateWords.some(word => message.includes(word))) {
                updateChatbox(input.value, 'user');
                updateChatbox('Sorry but I can\'t talk to you about that. Shall we start over.', 'bot');
                return;
            }
            if(restrictedMode && sensitiveWords.some(word => message.includes(word))) {
                updateChatbox(input.value, 'user');
                updateChatbox('Hmm, It seems the topic you wish to talk about has content that is blocked in Restricted Mode. If you wish to chat about that, turn off Restricted Mode. Shall we try a different topic?', 'bot');
                return;
            }
            if(reallyBadWords.some(word => message.includes(word))) {
                updateChatbox(input.value, 'user');
                updateChatbox('Hmm, this content is Blocked. It seems you are in direct violation of the TERMS and RULES. You have been suspended from the chat area. If this was an error, please contact Breakout-X.', 'bot');
                chatDisabled = true;
                return;
            }

            updateChatbox(input.value, 'user');

            let response = generateResponse(message);

            setTimeout(() => {
                updateChatbox(response, 'bot');
                //drawBotImage();
            }, 1000);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

function generateResponse(message) {
    let response = '';
    if (chatDisabled) {
        let responses = [
            "Chat is currently disabled due to suspension. Wait a couple minutes before chatting again.",
            "Chat is still disabled. Keep waiting...",
            "Why are you still here?"
        ];
        let randomIndex = Math.floor(Math.random() * responses.length);
        let randomResponse = responses[randomIndex];
        response = randomResponse;
    } else if(message === 'hi' || message === 'hello' || message === 'helo' || message === 'good morning' || message === 'good evening' || message === 'hoi') {
        //picks random between responses
        let responses = [
            "Hello",
            "Hi",
            "Hoi"
        ];
        let randomIndex = Math.floor(Math.random() * responses.length);
        let randomResponse = responses[randomIndex];
        response = randomResponse;
    } else if(message === 'describe yourself') {
        response = 'Describing myself in version 2.0 is futile. Try version 3.0 and try this command.';
    } else if(message === 'describe eledlow the fox') {
        response = 'Describing ELedlow the fox in version 2.0 is futile. Try version 3.0 and try this command.';
    } else if(message.startsWith('describe my character:')) {
        const characterDetails = message.split(':')[1].split(' ');
        const characterName = characterDetails[0];
        const gender = characterDetails[3];
        const animal = characterDetails[4];
        const color1 = characterDetails[9];
        const color2 = characterDetails[10];
        const likes = characterDetails[13];
        const hates = characterDetails[15];
        response = `Please note that tis is version 2.0, therefore this may not work as intended. Your character animal, "${characterName}" is a ${gender} ${animal} with ${color1} body and a ${color2} belly. ${characterName} likes ${likes} and hates ${hates}. Your character sounds facinating.`;
    } else {
        response = 'I am sorry, I didn\'t understand that. Try using this command in version 3.0';
    }
    return response;
}

function updateChatbox(message, sender) {
    chatbox.innerHTML += `<div class="${sender}">${message}</div>`;
    input.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
}
