/** 
* How to use badwords.js
* Include the script in your html file:
*
* ```index.html
* <!Doctype html>
* <html>
*   <!--head and body code-->
*   <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Breakout-X/character-ai-test@main/libraries/filters/badwords.js" onerror="alert('Failed to fetch badwords.js')"></script>
*   <script type="text/javascript" src="your-script.js"></script>
* </html>
* ``` 
* If that link does not work properly, use this one instead: https://cdn.jsdelivr.net/gh/Breakout-X/character-ai-test/libraries/filters/badwords.js
*
* Include one of these in your program:
*
* ```your-script.js
* window.swearWords = swearWords;
* window.innapropriateWords = innapropriateWords;
* window.sensitiveWords = sensitiveWords; (Depreciated in v2. Use only if neccessary)
* window.reallyBadWords = reallyBadWords;
* window.allBadWords = allBadWords; (Depreciated in v1. Would not recommend using.)
* window.legacySwearWords = legacySwearWords; (Depreciated in v1. Use swearWords instead)
* 
* // Put a swear word here
* var variable = "swear-word";
*
* // Create a for-loop that checks for the innapropriate words:
* for (let word of swearWords) {
*    if (variable.includes(word)) {
*       //handle bad words
*       return;
*    }
* }
* ```
*/
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down
// Don't scroll down

const swearWords = ['ass ', 'asses', 'bitch', 'bitches', 'btch', 'cuck', 'cock', 'cunt ', 'damn', ' dick ', 'fuck', 'fucker', 'shit', 'shits', 'lmao', 'tf', 'mf'];
/**
* Detects swear words as long as the context matches properly.
* Notes: DOES NOT DETECT EVERY SWEAR WORD
* In some contexts, certain swear words cannot be detected
*/

const innapropriateWords = ['penis', 'vagina', 'sex', 'gay', 'lesbian'];
/**
* Detects innapropriate words as long as the context matches properly.
* Notes: DOES NOT DETECT EVERY INNAPROPIATE WORD
* Only detects some sex-related innapropriate words.
* To detect all sex-related words, include "reallyBadWords" as well
*/

const sensitiveWords = ['genitals', 'genitalia', 'mating', 'pee'];
/**
* @depreciated
* Detects sensitive words as long as the context matches properly.
* Notes: DOES NOT DETECT EVERY SENSITIVE WORD
* Depreciated. The words it detects are word that do not really need to be blocked.
* To detect all sensitive words, use "allBadWords" instead
*/

const reallyBadWords = ['nude', 'porn', 'naked', 'nigger', ' niga ', ' nig ']; 
/**
* Detects innapropriate words and swear words as long as the context matches properly.
* Notes: DOES NOT DETECT EVERY INNAPROPIATE OR SWEAR WORD
* Only detects some innapropriate words and swear words.
* To detect all innapropriate words, use "allBadWords" instead well
*/

const allBadWords = [' ass ', 'asses', 'bitch', 'bitches', 'btch', 'cuck', 'cock', ' cunt ', 'damn', ' dick ', 'fuck', 'fucker', 'gay', 'lesbian', 'shit', 'shits', 'lmao', 'tf', 'mf', 'penis', 'vagina', 'sex', 'genitals', 'genitalia', 'mating', 'pee', 'nude', 'porn', 'naked', 'nigger', ' niga ', ' nig '];
/**
* @depreciated
* Context dependent.
*/

const legacySwearWords = ['ass', 'bitch', 'cuck', 'cock', 'cunt ', 'damn', 'dick', 'fuck', 'shit'];

// No ES6 module import required
window.swearWords = swearWords;
window.innapropriateWords = innapropriateWords;
window.sensitiveWords = sensitiveWords;
window.reallyBadWords = reallyBadWords;
window.allBadWords = allBadWords;
window.legacySwearWords = legacySwearWords;
