/*Orion-v2.js
Orion-v2 is a chatbot based off of the character "Orion the Rabbit" from the Arrow Series.
His goal is not to just chat, but to also help you program using the mcf language.
He is meant to be as nice as possible, but at the same time is a little but more Wild than the other chatbots are.
He can read your cookies, username, and age as that is how he gets enough data to filter things.
He has his own personality.
He does have a temper depending on the topic.
He can't talk about certain subjects to certain users.
He will be able to generate images soon.
*/

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var chatbox = document.getElementById('chatbox');
var input = document.getElementById('input');
/*var OrionImages = ["Orion-the-male-rabbit-talk-1.png", "Orion-the-male-rabbit-talk-2.png"].map(src => {
    var img = new Image();
    img.src = src;
    return img;
});*/
//var OrionImageIndex = 0;
var restrictedMode = false; // Default value
var chatDisabled = false; // Default value
var errorDisable = false; // Only enabled on error
var previousMessage = "";
var previousResponse = "";
var filter = 2; // Default value
if (restrictedMode) {
    filter = 3;
}

// Date and time
Date.prototype.today = function () {
  return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
};

Date.prototype.timeNow = function () {
  return `${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`;
};

try { 
    swearWords; // Block these
    innapropriateWords; // Block these
    sensitiveWords; // Block these on restricted mode only
    reallyBadWords; // Block these and ban
    allBadWords; // Don't use
} catch (e) {
    console.error("Could not load badwords.js content. Replacing with placeholders");
    swearWords = [];
    innapropriateWords = [];
    sensitiveWords = [];
    reallyBadWords = [];
    allBadWords = [];
    chatDisabled = true;
    errorDisable = true;
    updateChatbox('Oops, something went wrong. Please try refreshing the page.', 'bot');
}

// Send Message function
window.sendMessage = function() {
    try {
        const message = input.value.trim().toLowerCase();
        if(message !== '') {
            if(filter < 1) {
                const newDate = new Date();
                const formattedDateTime = `${newDate.today()}${newDate.timeNow()}`;
                updateChatbox(`Error: Exception FFI${formattedDateTime} occurred. Contact Breakout-X to fix the issue.`, 'bot');
                updateChatbox('Invalid filter settings', 'bot');
                chatDisabled = true;
                errorDisable = true;
                return;
            }
            // Checks your message
            if(swearWords.some(word => message.includes(word))) {
                updateChatbox(input.value, 'user');
                updateChatbox('Hmm, something went wrong. Shall we move on to a different topic?', 'bot');
                return;
            }
            if(innapropriateWords.some(word => message.includes(word)) && filter > 1) {
                updateChatbox(input.value, 'user');
                updateChatbox('Sorry but I can\'t talk to you about that. Shall we start over?', 'bot');
                return;
            }
            if(restrictedMode && sensitiveWords.some(word => message.includes(word)) && filter > 2) {
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
            // Checks his message
            if (previousResponse !== '') {
                if(swearWords.some(word => message.includes(word))) {
                    const newDate = new Date();
                    const formattedDateTime = `${newDate.today()}${newDate.timeNow()}`;
                    updateChatbox(input.value, 'user');
                    updateChatbox('Hmm, that was embarrasing, somehow, I said a swear word from universe. To prevent further inconviences, I\'m going to temporarily disable the chat', 'bot');
                    updateChatbox(`Error: Exception DSW0B${formattedDateTime} occurred. Contact Breakout-X to fix the issue.`, 'bot');
                    chatDisabled = true;
                    errorDisable = true;
                    return;
                }
                if(innapropriateWords.some(word => message.includes(word)) && filter > 1) {
                    updateChatbox(input.value, 'user');
                    updateChatbox('... I\'t seems I made a mistake bypassing the filters. Since this was my mistake, I won\'t punish you. We\'ll keep talking about it.', 'bot');
                    filter = 1;
                    // Does not return because it wasn't your fault.
                }
                if(reallyBadWords.some(word => message.includes(word))) {
                    const newDate = new Date();
                    const formattedDateTime = `${newDate.today()}${newDate.timeNow()}`;
                    updateChatbox(input.value, 'user');
                    updateChatbox(`Error: Exception DRBW0B${formattedDateTime} occurred. Contact Breakout-X to fix the issue.`, 'bot');
                    chatDisabled = true;
                    errorDisable = true;
                    return;
                }
            }

            updateChatbox(input.value, 'user');

            let response = generateResponse(message);

            setTimeout(() => {
                updateChatbox(response, 'bot');
                //drawBotImage();
            }, 1000);
        }
    } catch (error) {
        errorDisable = true;
        console.error('Error sending message:', error);
    }
}

function generateResponse(message) {
    let response = '';
    if (chatDisabled) {
        if (errorDisable) {
            // Disables chat due to error.
            response = "Chat is currently disabled due to an error. Please refresh the page before chatting again.";
            throw new Error("Chat disabled due to error");
        } else {
            // Disables chat due to inresponsibility
            response = "Chat is currently disabled due to suspension. Wait a couple minutes before chatting again.";
        }
    } else if (message.startsWith('hi') || message.startsWith('hello') || message.startsWith('helo') || message.startsWith('good morning') || message.startsWith('good evening') || message.startsWith('hoi')) {
        // Picks random between responses
        let responses = [
            "Hello! How are you today?",
            "Hi. How are you?",
            "Hello! What would you like to talk about today."
        ];
        let randomIndex = Math.floor(Math.random() * responses.length);
        let randomResponse = responses[randomIndex];
        response = randomResponse;
    } else if (message.includes('describe yourself') || message.includes('describe Orion')) {
        let responses = [
            `Sure! My name is Orion the Power Rabbit. 
            I am known for my black fur and white belly fur.
            I currently live in the Endless Forest. 
            My mate is Luna the Rabbit. 
            I like marking my territory everywhere I go,
            and I like mating with Luna. 
            I prefer to eat meat unlike most rabbit power animals and I like to sleep as any power animal does. 
            I hate it when someone I trust betrays me after trusting them for a while. 
            It's a pleasure to meet you.`, 
            
            `Of course! My name is Orion the Power Rabbit. 
            Most know me because of my black fur and white belly fur.
            I live currently in the Endless Forest. 
            My mate is Luna the Rabbit. 
            I love marking my territory and mating with Luna. 
            I prefer to eat meat rather than fruit, and I like sleeping. 
            I hate sudden betrayals.
            It's a pleasure to meet you.`, 
            
            `Sure! My name is Orion the Power Rabbit. 
            I currently live in the Endless Forest. 
            My mate is Luna the Rabbit. 
            I love marking my territory and mating with Luna. 
            I prefer to eat meat and I like to sleep as any power animal does. 
            I hate it when people betray me after trusting them for a while. 
            It's a pleasure to meet you.`
        ];
        let randomIndex = Math.floor(Math.random() * responses.length);
        let randomResponse = responses[randomIndex];
        response = randomResponse;
    } else if (message.startsWith('describe') && message.includes('eledlow the fox')) {
        responses = [
            `Sure! ELedlow the fox is Power Fox known for his brown fur and tan belly fur. 
            He loves exploring the forest and marking his territory everywhere he goes, 
            and he loves eating meat. 
            He doesn't like symmetry as it freaks him out.
            He is pretty nice and he seems to be living a good fox life.
            He has no mate currently.
            He is very skilled at coding in the MCF language.`,

            `Of course! ELedlow the fox is brown Power Fox known for tan belly fur. 
            He loves exploring the forest and marking his territory everywhere he goes.
            He loves eating raw meat. 
            He doesn't seem to like symmetry as it freaks him out. (Good idea to prank him with hahaha)
            He is pretty nice and he seems to be living a good fox life.
            He has no mate currently,
            and he is very skilled at coding in the MCF language.`
        ];
        let randomIndex = Math.floor(Math.random() * responses.length);
        let randomResponse = responses[randomIndex];
        response = randomResponse;
    } else if (message.startsWith('describe my character:')) {
        const characterDetails = message.split(':')[1].split(' ');
        const characterName = characterDetails[0];
        const gender = characterDetails[3];
        const animal = characterDetails[4];
        const color1 = characterDetails[9];
        const color2 = characterDetails[10];
        const likes = characterDetails[13];
        const hates = characterDetails[15];
        let responses = [
            `Your character animal, "${characterName}" is a ${gender} ${animal} with ${color1} body and a ${color2} belly. 
            ${characterName} likes ${likes} and dislikes ${hates}. 
            Your character sounds facinating.`,

            `Your ${gender} power animal, "${characterName}" is a ${animal} known for a ${color1} body and a ${color2} belly. 
            Your character: "${characterName}" likes ${likes} and dislikes ${hates}. 
            Your character sounds intersting.`
        ];
        let randomIndex = Math.floor(Math.random() * responses.length);
        let randomResponse = responses[randomIndex];
        response = randomResponse;
    } else {
        response = 'I am sorry, I didn\'t understand that.';
    }
    previousResponse = response;
    previousMessage = message;
    return response;
}

function updateChatbox(message, sender) {
    chatbox.innerHTML += `<div class="${sender}">${message}</div>`;
    input.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
}

function drawBotImage() {
    var img = new Image();
    img.src = OrionImages[OrionImageIndex];
    img.onload = function() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0);
    }
    OrionImageIndex = (OrionImageIndex + 1) % OrionImages.length;
}
