/**
* This file IS NOT a library.
* This file is configured to ONLY work with Orion-v3.
* If you wish to create your own ai using a similar engine, use 
* https://github.com/Breakout-X/Server/
* instead.
*/

// Type A
const classifiedDodgeResponses = [
    `I'm sorry, but that info is classified.`,
    `I am not permitted to tell you about that.`
];
const describePrompts = [
    `describe yourself`,
    `describe orion`,
    `description of yourself`,
    `description of orion`,
    `tell me about yourself`,
    `tell me your story`,
    `who are you`
];
const describeResponses = [
    `Sure! My name is Orion the Power Rabbit. 
    I am known for my black fur and white belly fur.
    I currently live in the Endless Forest. 
    My mate is Luna the Rabbit. 
    I like marking my territory everywhere I go,
    and I like mating with Luna. 
    I prefer to eat meat unlike most rabbit power animals 
    and I like to sleep as any power animal does. 
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
const describeELedlowPrompts = [
    `describe eledlow the fox`,
    `description of eledlow the fox`,
    `who is eledlow the fox`,
    `eledlow the fox description`
];
const describeELedlowResponses = [
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
    He doesn't seem to like symmetry as it freaks him out. (Good idea to prank him with hahaha.)
    He is pretty nice and he seems to be living a good fox life.
    He has no mate currently,
    and he is very skilled at coding in the MCF language.`
];
const defaultResponses = [
    `I am sorry, I didn\'t understand what you said. Could you please rephrase that?`,
    `I'm sorry, I guess my rabbit brain couldn't understand what you meant. Could you please rephrase that?`,
    `I'm sorry, I'm still getting used to the english language? Could you try to rephrase that please?`
];
const greetingPrompts = [
    'good morning',
    'good evening',
    'hi',
    'hello',
    'helo',
    'hoi',
    'h1',
    'h3ll0',
    'hell0',
    'h3llo',
    '_hello',
    'HELLO',
    'HI',
    'HOI'
];
const greetingResponses = [
    `Hello! How are you today?`,
    `Hi. How are you?`,
    `Hello! What would you like to talk about today.`
];
const refreshResponses = [
    `Appreaciate the refresh. Now what topic would you like to talk about now?`,
    `Ahh, it's good to clear my head after long topics. What would you like to talk about now?`
];
// Type B
const simpleMCFprompts = [];
const simpleMCFresponses = [];
const advancedMCFprompts = [];
const advancedMCFresponses = [];

// No import required
// Type A
window.classifiedDodgeResponses = classifiedDodgeResponses;
window.describePrompts - describePrompts;
window.describeResponses = describeResponses;
window.describeELedlowPrompts = describeELedlowPrompts;
window.describeELedlowResponses = describeELedlowResponses;
window.defaultResponses = defaultResponses;
window.greetingPrompts = greetingPrompts;
window.greetingResponses = greetingResponses;
window.refreshResponses = refreshResponses;
// Type B
window.simpleMCFprompts = simpleMCFprompts;
window.simpleMCFresponses = simpleMCFresponses;
window.advancedMCFprompts = advancedMCFprompts;
window.advancedMCFresponses = advancedMCFresponses;
