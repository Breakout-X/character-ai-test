import { inappropriateWords } from './badwords.js';

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var chatbox = document.getElementById('chatbox');
var input = document.getElementById('input');
var botImages = ["Orion-the-male-rabbit-talk-1.png", "Orion-the-male-rabbit-talk-2.png"];
var botImageIndex = 0;

function sendMessage() {
    try {
        const message = input.value.trim().toLowerCase();
        if(message !== '') {
            if(inappropriateWords.some(word => message.includes(word))) {
                updateChatbox(input.value, 'user');
                updateChatbox('Hmm, something went wrong. Let\'s move on to a different topic.', 'bot');
                return;
            }

            updateChatbox(input.value, 'user');

            let response = generateResponse(message);

            setTimeout(() => {
                updateChatbox(response, 'bot');
                drawBotImage();
            }, 1000);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

function generateResponse(message) {
    let response = '';
    if(message === 'describe yourself') {
        response = 'My name is Orion the Rabbit. It\'s a pleasure to meet you..';
    } else if(message === 'describe eledlow the fox') {
        response = 'ELedlow is a clever and cunning fox known for his brown fur with a tan belly. He loves exploring the forest and marking his territory, and he loves eating meat. He doesn\'t care about loud noises, but he doesn\'t like symmetry as it freaks him out.';
    } else if(message.startsWith('describe my character:')) {
        const characterDetails = message.split(':')[1].split(' ');
        const characterName = characterDetails[0];
        const gender = characterDetails[3];
        const animal = characterDetails[4];
        const color1 = characterDetails[9];
        const color2 = characterDetails[10];
        const likes = characterDetails[13];
        const hates = characterDetails[15];
        response = `${characterName} is a ${gender} ${animal} with ${color1} fur and a ${color2} belly. ${characterName} likes ${likes} and hates ${hates}.`;
    } else {
        response = 'I am sorry, I did not understand that.';
    }
    return response;
}

function updateChatbox(message, sender) {
    chatbox.innerHTML += `<div class="${sender}">${message}</div>`;
    input.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
}

function drawBotImage() {
    var img = new Image();
    img.src = botImages[botImageIndex];
    img.onload = function() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0);
    }
    botImageIndex = (botImageIndex + 1) % botImages.length;
}