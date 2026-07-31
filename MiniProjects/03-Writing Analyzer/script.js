const totalChar = document.getElementById("stat-characters");
const totalWords = document.getElementById("stat-words");
const totalSentences = document.getElementById("stat-sentences");
const totalParagraphs = document.getElementById("stat-paragraphs");

const readTime = document.getElementById("stat-reading-time");
const speakTime = document.getElementById("stat-speaking-time");
const avgWperSent = document.getElementById("stat-avg-words-per-sentence");
const longestSent = document.getElementById("stat-longest-sentence");

const clearBtn = document.getElementById("clear-btn");
const longestWord = document.getElementById("stat-longest-word");
const vocabRichness = document.getElementById("stat-vocabulary-richness");
const mostFrequentWords = document.getElementById("stat-most-frequent-words");
const fillerWords = document.getElementById("stat-filler-words");

const textInput = document.getElementById("text-input");

//HELPERS
function getWords(text) {
    const trimmed = text.trim();
    return trimmed === "" ? [] : trimmed.split(/\s+/);
}
// (punctuation/numbers stripped out) —
// used wherever two words should match regardless of case or punctuation
function getCleanWords(text) {
    return text.toLowerCase().match(/\b[a-z]+\b/g) || [];
}
function isTextEmpty(text) {
    return text.trim() === "";
}

//1 - Number of characters
function countChar(text) {
    return text.length;
}

// Number of words
function countWords(text) {
    return getWords(text).length;
}

// Number of sentences
function countSentences(text) {
    if (isTextEmpty(text)) {
        return 0;
    }

    const trimmedText = text.trim();
    let sentenceCount = 0;
    let previousWasEndMark = false;

    for (const char of trimmedText) {
        const isEndMark = [".", "!", "?"].includes(char);

        if (isEndMark && !previousWasEndMark) {
            sentenceCount++; // only count the FIRST punctuation mark in a run
        }
        previousWasEndMark = isEndMark;
    }
    return sentenceCount;
}

// Number of Paragraphs
function countParagraphs(text) {
    if (isTextEmpty(text)) {
        return 0;
    }

    const trimmedText = text.trim();
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

// Read time and Speak time
function formatTime(seconds) {
    if (seconds < 60) {
        return `${Math.ceil(seconds)} sec`;
    }

    return `${(seconds / 60).toFixed(1)} min`;
}

function calcReadTime(text) {
    if (isTextEmpty(text)) {
        return "Waiting for input...";
    }
    const words = getWords(text).length;
    return formatTime((words / 200) * 60);
}

function calcSpeakTime(text) {
    if (isTextEmpty(text)) {
        return "Waiting for input...";
    }
    const words = getWords(text).length;
    return formatTime((words / 130) * 60);
}

//Average words per sentence
function calcAvgWordsPerSentence(text) {
    const words = getCleanWords(text).length;
    const sentences = countSentences(text);
    if (sentences === 0) {
        return 0;
    }
    return (words / sentences).toFixed(1);
}

// Finding the longest word
function findLongestWord(text) {
    if (isTextEmpty(text)) {
        return "Waiting for input...";
    }

    const words = getWords(text);
    let longest = words[0];
    for (let i = 1; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    return longest;
}

// Finding longest sentence
function findLongestSent(text) {
    if (isTextEmpty(text)) {
        return "Waiting for input...";
    }
    const sentences = text.split(/[.!?]+/);
    let longest_sentence = "";
    let maxWords = 0;

    for (let i = 0; i < sentences.length; i++) {
        const currentSentence = sentences[i].trim();

        if (currentSentence === "") {
            continue;
        }
        const wordCount = getCleanWords(currentSentence).length;
        if (wordCount > maxWords) {
            maxWords = wordCount;
            longest_sentence = currentSentence;
        }
    }
    return longest_sentence;
}

// vocabulary richness
function calcVocabularyRichness(text) {
    if (isTextEmpty(text)) {
        return "0%";
    }
    const words = getCleanWords(text);
    const uniqueWords = new Set(words);

    const richness = (uniqueWords.size / words.length) * 100;

    return richness.toFixed(1) + "%";
}

//finding the mostFrequent words
function findFrequentWords(text) {
    if (isTextEmpty(text)) {
        return "Waiting for input...";
    }

    const frequency = {};
    const words = getCleanWords(text);

    for (const word of words) {
        if (frequency[word]) {
            frequency[word]++;
        } else {
            frequency[word] = 1;
        }
    }

    const arr = Object.entries(frequency);
    let sortedArr = arr.sort((a, b) => b[1] - a[1]);
    const topFive = sortedArr.slice(0, 5); // top 5 words only

    // Convert into display string
    let result = "";

    for (let i = 0; i < topFive.length; i++) {
        result += `${topFive[i][0]} (${topFive[i][1]})`;

        if (i !== topFive.length - 1) {
            result += ", ";
        }
    }

    return result;
}

function findFillerWords(text) {
    if (isTextEmpty(text)) {
        return "Waiting for input...";
    }
    const words = getCleanWords(text);
    const fillers = ["actually", "basically", "literally", "really", "very", "just", "like"];
    let count = 0;
    for (const word of words) {
        if (fillers.includes(word)) {
            count++;
        }
    }

    return count;
}

// A final method to implement logic of each method
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

    const longestSentence = findLongestSent(text);
    longestSent.textContent = longestSentence;
    longestSent.title = longestSentence;
    
    vocabRichness.textContent = calcVocabularyRichness(text);
    mostFrequentWords.textContent = findFrequentWords(text);
    fillerWords.textContent = findFillerWords(text);
}

textInput.addEventListener("input", updateStatistics);

clearBtn.addEventListener("click", function () {
    textInput.value = "";
    updateStatistics();
});
