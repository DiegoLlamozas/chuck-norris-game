import {Joke} from "./joke.entity.js";

/**
 * @class JokeQuestion
 * @summary Represents a quiz question based on a Chuck Norris joke with redacted words.
 */

export class JokeQuestion {

    /**
     * @param {Object} params - The question parameters.
     * @param {string} params.id - Unique question identifier.
     * @param {Joke|null} params.joke - The joke entity for this question.
     */

    constructor({
        id = "",
        joke = null,
                }) {
        this.id = id;
        this.joke = joke ? new Joke(joke) : null;

        const redaction = this.getRedactedValue();
        this.redactedJoke = redaction[0];
        this.redactedWords = redaction[1]

        this.numRedactedWords = this.redactedWords.length;
    }

    /**
     * Creates a redacted version of the joke text with words replaced by blanks.
     * @returns {Array} Array containing the redacted text and list of redacted words.
     * @summary Randomly selects up to 3 words to redact from the joke text.
     */

    getRedactedValue(){
        let wordsArray = this.joke.value.match(/\s+|\w+(?:'\w+)*|[^\w\s]/g) || [];

        let redactedWordsNum = 0;
        const redactedWords = [];
        const storedIndexes = [];

        while (redactedWordsNum < 3) {
            const selectedWordIndex =  Math.floor(Math.random() * wordsArray.length);

            if (/^[\w']+$/.test(wordsArray[selectedWordIndex]) &&
                !storedIndexes.includes(selectedWordIndex)){

                redactedWords.push({"word": wordsArray[selectedWordIndex].toLowerCase(), "index": selectedWordIndex});
                storedIndexes.push(selectedWordIndex);

                wordsArray[selectedWordIndex] = "___";

                redactedWordsNum++;
            }
        }

        const sortedRedactedWords = redactedWords.sort((word1, word2) => word1.index - word2.index).map((word) => word.word);

        const redactedValue = wordsArray.join("");

        return [redactedValue,sortedRedactedWords];
    }

    /**
     * Submits user answers for this question.
     * @param {Array<string>} answersSubmitted - Array of user answers.
     */

    submitAnswer(answersSubmitted){
        this.answerIsSubmitted = answersSubmitted.length === this.redactedWords.length;

        if (this.answerIsSubmitted){
            this.userAnswer = answersSubmitted.map(answer => answer.toLowerCase());
        }

    }

    /**
     * Calculates the score for this question based on correct answers.
     * @returns {number} Score (0 to number of redacted words).
     */

    calcScore(){
        let totalScore = 0;

        if (this.userAnswer) {
            for (let i = 0; i < this.redactedWords.length; i++) {
                if (this.userAnswer[i] === this.redactedWords[i]) {
                    totalScore++;
                }
            }
        }

        return totalScore;
    }
}