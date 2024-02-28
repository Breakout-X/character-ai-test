import { inappropriateWords } from './badwords.js';

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var chatbox = document.getElementById('chatbox');
var input = document.getElementById('input');

function sendMessage() {
    const message = input.value.trim().toLowerCase();
    if(message !== '') {
        if(inappropriateWords.some(word => message.includes(word))) {
            chatbox.innerHTML += `<div class="user">${input.value}</div>`;
            input.value = '';
            chatbox.innerHTML += `<div class="bot">Hmm, something went wrong. Let's move on to a different topic.</div>`;
            return;
        }

        chatbox.innerHTML += `<div class="user">${input.value}</div>`;
        input.value = '';

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
            response = `${characterName} is a ${gender} ${animal} with ${color1} and ${color2} fur. ${characterName} likes ${likes} and hates ${hates}.`;
        } else {
            response = 'I am sorry, I did not understand that.';
        }

        setTimeout(() => {
            chatbox.innerHTML += `<div class="bot">${response}</div>`;
            chatbox.scrollTop = chatbox.scrollHeight;
        }, 1000);
    }
}

function generateImage(command) {
    if(inappropriateWords.some(word => command.includes(word))) {
        drawErrorImage('ELedlow-the-male-fox-blocked-content-screen.png');
        return;
    }

    const parts = command.split(' ');
    const gender = parts[1];
    const animal = parts[2];
    const action = parts[3];
    const setting = parts[5];

    var bg = new Image();
    bg.src = setting + '-bg.png';
    bg.onerror = function() {
        drawErrorImage('ELedlow-the-male-fox-error-screen.png');
    };
    bg.onload = function() {
        ctx.drawImage(bg, 0, 0);

        var img = new Image();
        img.src = gender + '-' + animal + '-' + action + '.png';
        img.onerror = function() {
            drawErrorImage('ELedlow-the-male-fox-error-screen.png');
        };
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        }
    }
}

function drawErrorImage(src) {
    var img = new Image();
    img.src = src;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
}
