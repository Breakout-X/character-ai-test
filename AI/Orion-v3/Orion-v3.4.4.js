/*Orion-v3.js
Orion-v3 is a chatbot based off of the character "Orion the Rabbit" from the Arrow Series.
His goal is not to just chat, but to also help you program using the mcf language.
He is meant to be as nice as possible, but at the same time is a little but more Wild than the other chatbots are.
He can read your cookies, username, and age as that is how he gets enough data to filter things.
He has his own personality.
He does have a temper depending on the topic.
He can't talk about certain subjects to certain users.
He will be able to generate images soon.
V3 was remade due to an uncaught annoying bug.
*/

// Unused
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Variables and constants
var chatbox = document.getElementById('chatbox');
var input = document.getElementById('input');
var visualInput = document.getElementById('editable');

// Constant arrays
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
    console.log(`I could not find the "badwords.js" content, so I am replacing the arrays with empty placeholders.`);
    updateChatbox('Oops, something went wrong in getting the filters! Please try refreshing the page. If the problem persists, contact Breakout-X to fix the issue.', 'bot');
    swearWords = [];
    innapropriateWords = [];
    sensitiveWords = [];
    reallyBadWords = [];
    allBadWords = [];
}

// Send Message function
window.sendMessage = function() {
    try {
        console.log(`Here we go again...`);
        const message = input.value.trim().toLowerCase();
        const originalMessage = input.value;
        
        /*
        if (chat.disabled) {
            if (chat.responseTotal > chat.responseLimit) {
                console.log(`...`);
                input.disabled = true;
                visualInput.disabled = true;
            } else if (account.banned) {
                console.log(`You have been banned. There is nothing you can do now.`);
                input.disabled = true;
                visualInput.disabled = true;
            } else if (chat.eDisable) {
                console.log(`An error occurred, so the chat is disabled. Try refreshing the page.`);
                input.disabled = true;
                visualInput.disabled = true;
            } else {
                console.log(`The chat is disabled. Wait 5 minutes before chatting again.`);
                input.disabled = true;
                visualInput.disabled = true;
            }
        }
        */
        
        if(message !== '') {
            updateChatbox(originalMessage, 'user');
            console.log(`Your original message was sent to me successfully as: "${originalMessage}".`);
            console.log(`I am now writing my response while checking your message...`);
            
            // Generate and check response
            let response = generateResponse(message);
            let check = '';
            
            // Validates filter
            if (chat.filter < 1) {
                updateChatbox(`<error> Filter exception`, 'bot');
                throw new Error(`Exception: The variable 'chat.filter' is set to an invalid value of ${chat.filter}.`);
            }
            
            // Checks for swear words
            if(swearWords.some(word => message.includes(word))) {
                check = `... I'm unsure how I can respond to that...`;
                chat.disabled = true;
            }
            
            // Checks for sex-related innapropriate words.
            if(chat.filter > 1 && innapropriateWords.some(word => message.includes(word))) {
                check = `Hmm... Sorry but I can't talk to you about that right now. Shall we try another topic?`;
            }
            
            // Checks for words some would consider offensive
            if(chat.filter > 2  && restrictedMode && sensitiveWords.some(word => message.includes(word))) {
                updateChatbox(`<log> Restricted Mode is set to ON.`, 'bot');
                check = `Hmm, It seems the topic you wish to talk about has content that is blocked in Restricted Mode. Although I, personally have no problem talking about it, I just am not allowed to. If you wish to chat about that, turn off Restricted Mode. Shall we try a different topic?`;
            }

            // Checks for really bad words, such as racist terms.
            if(reallyBadWords.some(word => mess.includes(word))) {
                updateChatbox(`<violation> TERMS violation.`, 'bot')
                check = `Hmm... It seems you are in direct violation of the TERMS and RULES by using that word. You have been suspended from the chat area. If this was a mistake, please contact Breakout-X.`;
                chat.disabled = true;
                account.banned = true;
            }

            // Then generate response
            setTimeout(() => {
                if (check !== '') {
                    updateChatbox(check, 'orion');
                    return;
                }
                updateChatbox(response, 'bot');
                onsole.log(`If you can't see it, my response is: "${response}".`);
                //drawBotImage();
            }, 1000);
        }else{
            console.warn(`You cannot send a message with an empty value. Plus, how would I respond to that?`)
        }
    } catch (e) {
        updateChatbox(`There was an error in sending me your message: "${e}". Please try refreshing the page or resending your message. If the problem persists, contact Breakout-X to fix the issue.`, 'orion');
        console.error(`There was an error in sending me your message: "${e}"`);
    }
}

function generateResponse(message) {
    let response = '';
    try {
        if (chat.disabled) {
            if (chat.responseTotal > chat.responseLimit) {
                let responses = [
                    `You have reached the limit of interaction with me for today. Have a good day.`,
                    `You have reached your limit of interaction with me today. See you tommorrow.`,
                    `You have reached the limit of interaction with me today. Bye Bye.`
                ];
                let randomIndex = Math.floor(Math.random() * responses.length);
                let randomResponse = responses[randomIndex];
                response = randomResponse;

                visualInput.disabled = true;
                input.disabled = true;
            } else if (account.banned) {
                let responses = [
                    `You have been banned from the chat. Quit talking to me.`,
                    `You have been suspended from the chat. Stop talking to me.`,
                    `Stop talking to me. See you never.`
                ];
                let randomIndex = Math.floor(Math.random() * responses.length);
                let randomResponse = responses[randomIndex];
                response = randomResponse;

                visualInput.disabled = true;
                input.disabled = true;
            } else if (chat.eDisable) {
                response = `An error occurred during the chat. Please refresh the page.`;
                input.disabled = true;
            } else {
                response = `The chat is disabled. Wait five minutes before chatting again.`;
                input.disabled = true;
            }
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
