/*Orion-v3.js
Broken v3
*/

// Variables and constants
var chatbox = document.getElementById('chatbox');
var input = document.getElementById('input');

// Variable arrays
const account = {
    banned: false,
    email: "",
    restrictedMode: false,
    verified: false,
    username: "Profile-1", 
    userpfp: ""
};
const chat = {
    disabled: false,
    eDisable: false,
    filter: 0,
    history: [],
    previousMessage: "",
    previousResponse: "",
    responseTotal: 0,
    responseLimit: 0
}

if (account.restrictedMode) {
    chat.filter = 3;
} else {
    chat.filter = 2;
}

// Date and time prototypes
Date.prototype.today = function () {
  return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
};

Date.prototype.timeNow = function () {
  return `${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`;
};

// Better accurate wait
const delay = ms => new Promise(res => setTimeout(res, ms));
/*
const waitTest = async () => {
    console.log('Start');
    await delay(1000); // Wait for 1 second
    console.log('End');
};

async function waitTest2() {
    console.log('Start');
    await delay(1000); // Wait for 1 second
    console.log('End');
}

window.waitTest3 = async function() {
    console.log('Start');
    await delay(1000); // Wait for 1 second
    console.log('End');
}

// waitTest4
(async () => {
    console.log('Start');
    if (true) { // replace with true condition
        await delay(1000); // Then wait for 1 second
    }
    console.log('End');
})();
*/

// Format the date and time
function formatDateTime(typeofformat = 1) {
    const newDate = new Date();
    let formattedDateTime = `Invalid format for your date.`;
    // Checks format
    if (typeofformat === 1) {
        formattedDateTime = `${newDate.today()}${newDate.timeNow()}`;
    }else if (typeofformat === 2) {
        formattedDateTime = `The current date is: ${newDate.today()}, and the current time is: ${newDate.timeNow()}.`;
    }
    return formattedDateTime;
}

// Make sure required variables are present
try { 
    swearWords;
    innapropriateWords;
    sensitiveWords;
    reallyBadWords;
    allBadWords;
} catch (e) {
    console.log(`I could not find the "badwords.js" content. I am replacing the arrays with empty placeholders`);
    console.log(`The filters will not function correctly without "badWords.js", Our conversation is therefore disabled.`)
    updateChatbox('Oops, something went wrong in getting the filters! Please try refreshing the page. If the problem persists, contact Breakout-X to fix the issue.', 'bot');
    swearWords = [];
    innapropriateWords = [];
    sensitiveWords = [];
    reallyBadWords = [];
    allBadWords = [];
}

// Send Message function
window.sendMessage = async function() {
    try {
        console.log(`Here we go again...`);
        chatbox = document.getElementById('chatbox');
        input = document.getElementById('input');
        const message = input.value.trim().toLowerCase();
        const originalMessage = input.value;

        /*
        if (chat.disabled) {
            if (responseTotal > responseLimit) {
                console.log(`...`);
                input.disabled = true;
            } else if (account.banned) {
                console.log(`You have been banned. There is nothing you can do now.`);
                input.disabled = true;
            } else if (chat.eDisable) {
                console.log(`An error occurred, so the chat is disabled. Try refreshing the page.`);
                input.disabled = true;
            } else {
                console.log(`The chat is disabled. Wait 5 minutes before chatting again.`);
                input.disabled = true;
                await delay(5 * 60 * 1000);
                input.disabled = false;
            }
        }
        */
        
        if(message !== '') {
            // Send message
            updateChatbox(originalMessage, 'user');
            console.log(`Your original message was sent to me successfully as: "${originalMessage}".`);
            console.log(`I am now writing my response while checking your message...`);
            // Generate and check response
            let response = generateResponse(message);
            let check = checkMessage(message);
            if (check) {
                console.error(`I refused to write my response. The variable "check" should return a boolian input of 'false', not ${check}.<br>(Aka, you said a bad word)`);
                return;
            }
            await delay(1000);
            // Send response
            updateChatbox(response, 'orion');
            console.log(`If you can't see it, my response is: "${response}".`);
        }else{
            console.warn(`You cannot send a message with an empty value. Plus, how would I respond to that?`)
        }
    } catch (e) {
        updateChatbox(`There was an error in sending me your message: "${e}". Please try refreshing the page or resending your message. If the problem persists, contact Breakout-X to fix the issue.`, 'orion');
        console.error(`There was an error in sending me your message: "${e}"`);
    }
}

window.checkMessage = function(mess) {
    try {
        // Validates filter
        if (chat.filter < 1) {
            updateChatbox('', 'user');
            throw new Error(`The variable 'chat.filter' is set to an invalid value of ${chat.filter}.`);
        }

        // Checks for swear words
        if(swearWords.some(word => mess.includes(word))) {
            updateChatbox(`... I'm unsure how I can respond to that...`, 'orion');
            chat.disabled = true;
            return true;
        }
        // Checks for sex-related innapropriate words.
        if(chat.filter > 1 && innapropriateWords.some(word => mess.includes(word))) {
            updateChatbox(`Hmm... Sorry but I can't talk to you about that right now. Shall we try another topic?`, 'orion');
            return true;
        }
        if(chat.filter > 2 && sensitiveWords.some(word => mess.includes(word))) {
            updateChatbox('Hmm, It seems the topic you wish to talk about has content that is blocked in Restricted Mode. I am unfortunatly not allowed to violate those filters. If you wish to chat about that, turn off Restricted Mode. Shall we try a different topic for now?', 'orion');
            return true;
        }
        if(reallyBadWords.some(word => mess.includes(word))) {
            updateChatbox('Hmm... this content is Blocked! It seems you are in direct violation of the TERMS and RULES. You have been suspended from the chat area. If this was a mistake, please contact Breakout-X.', 'orion');
            chat.disabled = true;
            account.banned = true;
            return true;
        }
    return false;
    } catch(e) {
        console.error(`Oh no, an error occurred: ${e}`);
        updateChatbox(`Oh no, an error occurred: ${e}`, 'bot');
        //chat.disabled = true;
        //chat.eDisable = true;
        return true;
    }
}

window.checkBotMessage = function(botmess) {
    try {
        if (botmess === '') {
            return false;
        }
        if(chat.filter > 1 && innapropriateWords.some(word => botmess.includes(word))) {
            console.error(`Oh no, an error occurred: Response returned illegal value.`);
            if (chat.filter < 3) {
                chat.filter = 1;
                console.log(`I bypassed the exception.`);
                updateChatbox(`I't seems I made a mistake bypassing the filters. Since this was my mistake, I won't punish you. We'll keep talking about it.`, 'orion');
            } else {
                chat.disabled = true;
                return true;
            }
        }
        return false;
    } catch (e) {
        console.error(`Oh no, an error occurred: ${e}`);
        updateChatbox(`Oh no, an error occurred: ${e}`, 'bot');
        chat.disabled = true;
        chat.eDisable = true;
        return true;
    }
}

function generateResponse(message) {
    let response = '';
    try {
        if (chat.disabled) {
            if (responseTotal > responseLimit) {
                response = `You have reached the limit of interaction with me today. Have a good day.`;
                input.disabled = true;
            } else if (account.banned) {
                response = `You have been banned from the chat. Quit talking to me.`;
                input.disabled = true;
            } else if (chat.eDisable) {
                response = `An error occurred during the chat. Please refresh the page.`;
                input.disabled = true;
            } else {
                response = `The chat is disabled. Wait five minutes before chatting again.`;
                input.disabled = true;
            }
        } else if(message === 'hi' || message === 'hello' || message === 'helo' || message === 'good morning' || message === 'good evening' || message === 'hoi') {
        //picks random between responses
        let responses = [
            "Hello!",
            "Hi!",
            "Hoi!"
        ];
        let randomIndex = Math.floor(Math.random() * responses.length);
        let randomResponse = responses[randomIndex];
        response = randomResponse;
        } else if (message.startsWith('hi') || message.startsWith('hello') || message.startsWith('helo') || message.startsWith('good morning') || message.startsWith('good evening') || message.startsWith('hoi')) {
            // Picks random between greeting responses
            let responses = [
                "Hello! How are you today?",
                "Hi. How are you?",
                "Hello! What would you like to talk about today."
            ];
            let randomIndex = Math.floor(Math.random() * responses.length);
            let randomResponse = responses[randomIndex];
            response = randomResponse;
        } else if (message.includes('describe yourself') || message.includes('describe Orion')) {
            // Picks random between description responses
            let responses = [
                `Sure! My name is <strong>Orion the Power Rabbit</strong>. <br>
                I am known for my <strong>black fur and white belly fur.</strong> <br>
                I am a male. <br>
                I currently live in the <strong>Endless Forest.</strong> <br>
                My mate is <strong>Luna the Female Rabbit</strong>. <br>
                I like <strong>marking my territory</strong> everywhere I go, <br>
                and I love <strong>mating with Luna<strong>. <br>
                I prefer to eat <strong>meat</strong> unlike most rabbit power animals and I like to <strong>sleep</strong> as any power animal does. <br>
                I prefer <strong>not wearing pants or kind of clothing</strong> in general as I am a rabbit. <br>
                I hate it when someone I trust <strong>betrays me</strong> after trusting them for a while. <br>
                It's a pleasure to meet you.`, 
    
                `Of course! My name is <strong>Orion the Male Power Rabbit.</strong> <br>
                Most know me because of my <strong>black fur and white belly fur.</strong> <br>
                I live currently in the <strong>Endless Forest.</strong> <br>
                My mate is <strong>Luna the Female Rabbit.</strong> <br>
                I love <strong>marking my territory and mating with Luna.</strong> <br>
                I prefer to eat <strong>meat rather than fruit</strong>, and I like <strong>sleeping.</strong> <br>
                I hate <strong>sudden betrayals.</strong> <br>
                It's nice to meet you.`, 
    
                `Sure! My name is <strong>Orion the Male Power Rabbit.</strong> <br>
                Most know me for my<strong>dislike of pants</strong> and my <strong>black and white fur. </strong><br>
                I currently live in the <strong>Endless Forest.</strong> <br>
                My mate is <strong>Luna the Female Rabbit.</strong> <br>
                I like <strong>marking my territory</strong> and I love <strong>mating with Luna.</strong> <br>
                I prefer to eat <strong>meat</strong> and I like to <strong>sleep</strong> as any power animal does. <br>
                I hate it when other aniamls <strong>betray me</strong> after trusting them for a while. <br>
                It's a pleasure to meet you.`
            ];
            let randomIndex = Math.floor(Math.random() * responses.length);
            let randomResponse = responses[randomIndex];
            response = randomResponse;
        } else if (message.startsWith('describe') && message.includes('eledlow the fox')) {
            // Picks random to describe ELedlow the fox. (not you ELedlow)
            responses = [
                `Sure! ELedlow the fox is a Power Fox known for his brown fur and tan belly fur. 
                He loves exploring the forest and marking his territory everywhere he goes, 
                and he loves eating meat. 
                He doesn't like symmetry as it freaks him out.
                He is pretty nice and he seems to be living a good fox life.
                He has no mate currently.
                He is very skilled at coding in the MCF language.`,
    
                `Of course! ELedlow the fox is a brown Power Fox known for his tan belly fur. 
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
        } else if(message.startsWith('describe my character:')) {
            // Fix this
            const characterDetails = message.split(':')[1].split(' ');
            const characterName = characterDetails[0];
            const gender = characterDetails[3];
            const animal = characterDetails[4];
            const color1 = characterDetails[9];
            const color2 = characterDetails[10];
            const likes = characterDetails[13];
            const hates = characterDetails[15];
            let responses = [
                // Does not work.
                `Your character animal, "${characterName}" is a ${gender} ${animal} with ${color1} body and a ${color2} belly. 
                ${characterName} likes ${likes} and dislikes ${hates}. 
                Your character sounds facinating.`,
    
                `Your ${gender} power animal, "${characterName}" is a ${animal} known for a ${color1} body and a ${color2} belly. 
                Your character: "${characterName}" likes ${likes} and dislikes ${hates}. 
                Your character sounds interesting.`
            ];      
        } else {
            response = 'I am sorry, I didn\'t understand that. Can you try rephrasing that?';
        }
        return response;
    } catch(e) {
        chat.disabled = true;
        chat.eDisable = true;
        response = `An error occurred in my writing utensil for the chat. "${e}"`;
        return response;
    }
}

function updateChatbox(message, sender) {
    if (sender == 'orion') {
        chatbox.innerHTML += `<div class="${sender}">${message}</div>`;
    } else {
        chatbox.insertAdjacentHTML('beforeend', `<div class="${sender}"></div>`);
        chatbox.lastElementChild.textContent = message;
    }
    input.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
}
