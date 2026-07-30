const totalChar = document.getElementById("stat-characters");
const totalWords = document.getElementById("stat-words");
const totalSentences = document.getElementById("stat-sentences");
const totalParagraphs = document.getElementById("stat-paragraphs");

const readTime = document.getElementById("stat-reading-time");
const speakTime = document.getElementById("stat-speaking-time");
const avgWperSent = document.getElementById("stat-avg-words-per-sentence");
const longestSent = document.getElementById("stat-longest-sentence");

const longestWord = document.getElementById("stat-longest-word");
const vocabRichness = document.getElementById("stat-vocabulary-richness");
const mostFrequentWords = document.getElementById("stat-most-frequent-words");
const fillerWords = document.getElementById("stat-filler-words");


const textInput = document.getElementById("text-input");
const text = textInput.value;

function countChar(text){
    let count = 0;
    for ( const char of text ){
        count ++;
    }
    return count;
}

function countWords(text){
    let wordCount = 0;
    for (let i = 0; i < text.length; i++) {
        const currentChar = text[i];
        const previousChar = text[i - 1];
    
        const isCurrentSpace = currentChar === " ";
        const isPreviousSpace = previousChar === " " ||  previousChar === undefined;;
    
        if (!isCurrentSpace && isPreviousSpace) {
            wordCount++;
        }
    }
   return wordCount;
}

function countSentences(text){
    const trimmedText = text.trim();
    if (trimmedText ==="") {
        totalSentences.textContent = 0;
        return;
    }

    let sentenceCount = 0;
    let previousWasEndMark = false;

    for (const char of trimmedText){
        const isEndMark = [".", "!", "?"].includes(char);

        if (isEndMark && !previousWasEndMark) {
            sentenceCount++; // only count the FIRST punctuation mark in a run
        }
        previousWasEndMark = isEndMark;
    }
    return sentenceCount;
}

function countParagraphs(text) {
    const trimmedText = text.trim();

    if (trimmedText === "") {
        totalParagraphs.textContent = 0;
        return;
    }

    let paragraphCount = 1;
    let previousWasBlankLine = false;

    for (let i = 0; i < trimmedText.length - 1; i++) {
        const isBlankLine = trimmedText[i] === "\n" && trimmedText[i + 1] === "\n";

        if (isBlankLine && !previousWasBlankLine) {
            paragraphCount++;
        }
        previousWasBlankLine = isBlankLine;
    }
    return paragraphCount;
}

// ======Since read and speak use the same logic to prevent duplication of logic we write like this
function formatTime(seconds) {
    if (seconds < 60) {
        return `${Math.ceil(seconds)} sec`;
    }

    return `${(seconds / 60).toFixed(1)} min`;
}

function calcReadTime(text ){
    const words = countWords(text);
    return words === 0 ? "Waiting for input..." : formatTime((words / 200) * 60);

    // const readingTimeSeconds = (words / 200) * 60;
    
    // if (readingTimeSeconds < 60) {
    //     return `${Math.ceil(readingTimeSeconds)} sec`;
    // }
    // else {
    //    const readingTimeMinutes = readingTimeseconds/60;
    //    return `${readingTimeMinutes.toFixed(1)} min`;
    // }
}

function calcSpeakTime(text ){
    const words = countWords(text);
    return words === 0 ? "Waiting for input..." : formatTime((words / 130) * 60);
}

function calcAvgWordsPerSentence(text) {
    const words = countWords(text);
    const sentences = countSentences(text);
    if (sentences === 0) {
        return 0;
    }
    return (words / sentences).toFixed(1);
}


function findLongestWord(text){
    const words = text.trim().split(/\s+/); // array

    if (text.trim() === "") {
        return "Waiting for input...";
    }

    let longest = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    return longest;
}



function updateStatistics() {
    const text = textInput.value;

    totalChar.textContent = countChar(text);
    totalWords.textContent = countWords(text);
    totalSentences.textContent = countSentences(text);
    totalParagraphs.textContent = countParagraphs(text);

    readTime.textContent = calcReadTime(text);
    speakTime.textContent = calcSpeakTime(text);
    avgWperSent.textContent = calcAvgWordsPerSentence(text);

    longestWord.textContent = findLongestWord(text);
}

textInput.addEventListener("input", updateStatistics);

clearBtn.addEventListener("click", function () {
    textInput.value = "";
    updateStatistics();
});