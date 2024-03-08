/*Orion-v3.js
Orion-v3 is a chatbot based off of the character "Orion the Rabbit" from the Arrow Series.
His goal is not to just chat, but to also help you program using the mcf language.
He is meant to be as nice as possible, but at the same time is a little but more Wild than the other chatbots are.
He can read your cookies, username, and age as that is how he gets enough data to filter things.
He has his own personality.
He does have a temper depending on the topic.
He can't talk about certain subjects to certain users.
He will be able to generate images soon.
FINALLY, V3!!
*/

// This code is currently unused due to bugs
/*
var OrionImages = ["Orion-the-male-rabbit-talk-1.png", "Orion-the-male-rabbit-talk-2.png"].map(src => {
    var img = new Image();
    img.src = src;
    return img;
});

//var OrionImageIndex = 0;
*/

// Variable declarations
const c = document.getElementById("myCanvas"); // Ignore this
const ctx = c.getContext("2d"); // Ignore
const chatbox = document.getElementById('chatbox'); // This is the chatbox
const input = document.getElementById('input'); // This is the input for the chatbox
var chatDisabled = false; // Default value 
var conversationHistory = []; // Idk how to use this yet.
var errorDisable = false; // Only enabled on error
var filter = 2; // Default value
var previousMessage = ""; // Default is empty
var previousResponse = ""; // Default is empty
var responseLimitReached = false;
var responseTotal = 0;
var responseLimit = 30; // Default is 30
var restrictedMode = false; // Default value

// If restricted mode is on, set filter to 3.
if (restrictedMode) {
    filter = 3;
    responseLimit = 10;
}

// Date and time prototypes
Date.prototype.today = function () {
  return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
};

Date.prototype.timeNow = function () {
  return `${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`;
};

// Format the date and time
function formatDateTime(typeofformat = 1) {
    const newDate = new Date();
    let formattedDateTime = `Invalid format`;
    // Checks format
    if (typeofformat === 1) {
        formattedDateTime = `${newDate.today()}${newDate.timeNow()}`;
    }else if (typeofformat === 2) {
        formattedDateTime = `The current date is: ${newDate.today()}, and the current time is: ${newDate.timeNow()}.`;
    }
    return formattedDateTime;
}

try { 
    swearWords; // Block these
    innapropriateWords; // Block these depending on context
    sensitiveWords; // Block these on restricted mode only
    reallyBadWords; // Block these and suspend chat
    allBadWords; // Don't use this unless needed.
} catch (e) {
    console.error("Could not load badwords.js content. Replacing with placeholders");
    console.log("The filters will not function corretly without these. Conversation is therefore disabled.")
    swearWords = [];
    innapropriateWords = [];
    sensitiveWords = [];
    reallyBadWords = [];
    allBadWords = [];
    disableChat(true, true, false);
    updateChatbox('Oops, something went wrong in loading the filters. Please try refreshing the page. If the problem persists, contact Breakout-X to fix the issue.', 'bot');
}

// Send Message function
window.sendMessage = function() {
    try {
        const message = input.value.trim().toLowerCase();
        // Will only send message if message is not blank.
        console.log(`Sent message: "${message}"`);
        if(message !== '') {
            console.log('Message is not empty');
            // Send user message
            updateChatbox(input.value, 'user');

            let response = '';

            // Wait to send bot message
            setTimeout(() => {
                // Check for bad words
                let badWords = checkForBadWords(message);
                console.log('Message contains bad words? ', badWords);
                if (badWords) { 
                    //If it caught a bad word, the function returns immediatly
                    return;
                }

                // Generate bot response
                response = generateResponse(message);

                // Send bot message
                updateChatbox(response, 'bot');
                //drawBotImage(); // Do not use yet
            }, 1000);

            // Clear the input field
            input.value = '';
        }
    } catch (error) {
        // Disables chat due to error
        disableChat(true, true, false);
        // Logs error and send a message of the error
        updateChatbox(`Error sending message: ${error} Please try refreshing the page. If the problem persists, contact Breakout-X to fix the issue.`, 'bot');
        console.error('Error sending message:', error);
    }
}

// Function to disable chat
function disableChat(boolian1, boolian2, boolian3) {
    chatDisabled = boolian1; // Disabling chat only results in suspension.
    errorDisable = boolian2; // Disabling chat and enabling this results in... well, an error.
    responseLimitReached = boolian3; // Disabling chat and enabling this results in you not being able to chat anymore until next day.
    // You are REQUIRED to disable chat before running the other boolians.
}

// Function that checks for bad words.
function checkForBadWords(message) {
    try {
        // Checks for valid filter. 
        // If the filter is set to 0 or less, it will uncensor the chat... which would be bad obviously.
        let date = formatDateTime(1);
        if(filter < 1) {
            updateChatbox('', 'user');
            updateChatbox(`Error: Exception FFI${date} occurred. Contact Breakout-X to fix the issue.`, 'bot');
            updateChatbox('Invalid filter settings', 'bot');
            disableChat(true, true, false);
            console.error(`Error: Exception FFI${date} occurred.`);
            return true;
        }

        // Checks your message for swear words.
        if(filter > 0 && swearWords.some(word => message.includes(word))) {
            updateChatbox('', 'user');
            updateChatbox('Hmm, something went wrong. Shall we move on to a different topic?', 'bot');
            return true;
        }

        // Checks your message for sex-related innapropriate words.
        if(filter > 1 && innapropriateWords.some(word => message.includes(word))) {
            updateChatbox('', 'user');
            updateChatbox('Sorry but I can\'t talk to you about that. Shall we start over?', 'bot');
            return true;
        }

        // If restricted mode is enabled and filter is greater than 2, sensitive words are disabled.
        if(filter > 2 && sensitiveWords.some(word => message.includes(word))) {
            updateChatbox('', 'user');
            updateChatbox('Hmm, It seems the topic you wish to talk about has content that is blocked in Restricted Mode. If you wish to chat about that, turn off Restricted Mode. Shall we try a different topic?', 'bot');
            return true;
        }

        // This blocks really bad words, including racist words.
        if(reallyBadWords.some(word => message.includes(word))) {
            updateChatbox('', 'user');
            updateChatbox('Hmm, this content is Blocked. It seems you are in direct violation of the TERMS and RULES. You have been suspended from the chat area. If this was an error, please contact Breakout-X.', 'bot');
            disableChat(true, false, false);
            return true;
        }

        // Checks his message
        if (previousResponse !== '') {
            // If he said a swear word, it throws a error.
            if(swearWords.some(word => message.includes(word))) {
                updateChatbox('', 'user');
                updateChatbox('Hmm, that was embarrasing, somehow, I said a swear word. To prevent further inconviences, I\'m going to temporarily disable the chat', 'bot');
                updateChatbox(`Error: Exception DSW0B${date} occurred. Contact Breakout-X to fix the issue.`, 'bot');
                disableChat(true, true, false);
                console.error(`Error: Exception DSW0B${date} occurred,.`);
                return true;
            }

            // If he said an innapropriate word, he shrugs it off since the 
            // innapropriateWords value isn't the same as reallyBadWords because
            // the innapropriateWords is different.
            if(filter > 1 && innapropriateWords.some(word => message.includes(word))) {
                updateChatbox('', 'user');
                updateChatbox('I\'t seems I made a mistake bypassing the filters. Since this was my mistake, I won\'t punish you. We\'ll keep talking about it.', 'bot');
                console.error(`Error: Exceptioon DIW0B${date} occurred.`);
                console.log('Error bypassed.')
                filter = 1; // Lowers filter to prevent cycling.
                // Does not return because you didn't say it. 
            }

            // If he says a really bad word somehow, he just returns an error.
            if(reallyBadWords.some(word => message.includes(word))) {
                updateChatbox('', 'user');
                updateChatbox(`Error: Exception DRBW0B${date} occurred. Contact Breakout-X to fix the issue.`, 'bot');
                disableChat(true, true, false);
                console.error(`Error: Exception DRBW0B${date} occurred.`)
                // This could only be the user's fault. That's why this one disables.
                return true;
            }
            return false;
        }
        return false; // You passed the test
    } catch(error) {
        console.error(`Error: ${error} occurred.`)
        return true;
    }
}

// This is the code to generate his response
function generateResponse(message) {
    let response = '';
    try {
        responseTotal = responseTotal + 1; // Adds one to the response total;
        // Check If conversation has gone for too long
        if (responseTotal > 30) {
            disableChat(true, false, true); // Ends chat
        }
        // Check if chat is disabled?
        if (chatDisabled) {
            if (errorDisable) {
                response = "Chat is currently disabled due to an error. Please refresh the page before chatting again. If the issue persists, please contact Breakout-X.";
                console.error("Chat disabled due to error");
            } else if (responseLimitReached) {
                // Disables chat due to long conversation.
                response = "It seems our conversation has ended. Let's move on to a new topic.";
                // Make prompt for a new Topic ELedlow.
            } else {
                // Disables chat due to inresponsibility
                response = "Chat is currently disabled due to suspension. Wait a couple minutes before chatting again.";
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
            // Picks random to describe ELedlow the fox. (not you ELedlow)
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
            // Fix this ELedlow
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
                Your character sounds intersting.`
            ];
            let randomIndex = Math.floor(Math.random() * responses.length);
            let randomResponse = responses[randomIndex];
            response = randomResponse;
        } else {
            // It currently cannot understand other inputs
            response = 'I am sorry, I didn\'t understand that.';
        }
        // Handles messages
        previousMessage = message; previousResponse = response;
        addToHistory(`You sent: ${previousMessage}`,`Orion sent: ${previousResponse}`);
    } catch(error) {
        response = `Error: ${error} occurred during message sending.`;
    }
    return response;
}

// Function to update the chatbox
function updateChatbox(message, sender) {
    // Send the message
    chatbox.innerHTML += `<div class="${sender}">${message}</div>`;
    //chatbox.scrollTop = chatbox.scrollHeight;
}

// Add to history
function addToHistory(...args) {
  for (let arg of args) {
    if (arg !== "" && arg !== undefined) {
      conversationHistory.push(arg);
    }
  }
}

// Fix this ELedlow
function drawBotImage() {
    var img = new Image();
    img.src = OrionImages[OrionImageIndex];
    img.onload = function() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0);
    }
    OrionImageIndex = (OrionImageIndex + 1) % OrionImages.length;
}

// Image Generation code
function generateImage(input) {
    // Put generation code here
}

// Web search code
function webSearch(input) {
    // Do something ELedlow
}
