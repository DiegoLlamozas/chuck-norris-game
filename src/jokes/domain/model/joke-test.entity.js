import {JokeQuestion} from "./joke-question.entity.js";

/**
 * @class JokeTest
 * @summary Represents a complete test containing multiple joke questions.
 */

export class JokeTest{

    /**
     * @param {Object} params - The test parameters.
     * @param {string} params.id - Unique test identifier.
     * @param {Array<JokeQuestion>} params.jokeQuestions - Array of joke questions.
     */

    constructor({
        id = "",
        jokeQuestions = []
                }) {
        this.id = id;
        this.jokeQuestions = jokeQuestions;
    }

    /**
     * Checks if all questions in the test have been answered.
     * @returns {boolean} True if all questions have submitted answers.
     */

    testIsCompleted(){
        return this.jokeQuestions.reduce((acc,curr) => acc.answerIsSubmitted && curr.answerIsSubmitted, true);
    }

    /**
     * Calculates the total score for the entire test.
     * @returns {number} Total score across all questions.
     */

    calcTotalScore(){
        return this.jokeQuestions.reduce((acc,curr) => acc.calcScore + curr.calcScore, 0);
    }

    /**
     * Calculates the percentage score for the test.
     * @returns {number} Percentage score (0-100).
     */

    calcPercentage(){
        const totalQuestions = this.jokeQuestions.reduce((acc, curr) => acc.redactedWords.length + curr.redactedWords.length, 0)

        return (this.calcTotalScore() / totalQuestions) * 100;
    }
}