import {ChuckNorrisApi} from "../infrastructure/chuck-norris-api.js";
import {computed, ref} from "vue";
import {defineStore} from "pinia";

import {JokeTestAssembler} from "../infrastructure/joke-test.assembler.js";

import { v4 as uuidv4 } from 'uuid';

const chuckNorrisApi = new ChuckNorrisApi();

/**
 * Utility function to create a delay.
 * @param {number} milliseconds - The number of milliseconds to wait.
 * @returns {Promise} A promise that resolves after the specified delay.
 */

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

/**
 * Pinia store for managing Jokes bounded context state.
 * Handles joke test creation, question management, and game state.
 * @returns {Object} The store object with state and actions.
 */

const useJokesStore = defineStore('test', () => {
    const jokeTest = ref(null);

    const errors = ref([])

    const jokeTestLoaded = ref(false);

    const currentJokeQuestion = ref(null);
    const submittedAnswers = ref(0);
    const testIsFinished = ref(false);
    const totalQuestions = computed(() => {return jokeTest.value.jokeQuestions.length ?? null});

    const totalScore = ref(0);
    const answeredQuestions = ref(0);

    /**
     * Fetches the joke test data from the API.
     * @summary Currently sets loaded flag but doesn't fetch from API.
     */

    function fetchJokeTest() {
        jokeTestLoaded.value = true;

    }


    /**
     * Advances to the next question in the test.
     * @summary Updates score, moves to next question or marks test as finished.
     */

    function nextQuestion(){
        console.log(submittedAnswers.value)

        console.log(totalQuestions.value)

        totalScore.value += currentJokeQuestion.value.calcScore();


        submittedAnswers.value++;

        if (submittedAnswers.value < totalQuestions.value){
            currentJokeQuestion.value = jokeTest.value.jokeQuestions[submittedAnswers.value];

            console.log(currentJokeQuestion.value);
        } else {
            currentJokeQuestion.value = null;

            testIsFinished.value = true;
        }
    }

    /**
     * Fetches unique Chuck Norris jokes from the API.
     * @param {number} numOfJokes - Number of jokes to fetch (default: 10).
     * @param {number} awaitTime - Delay between API calls in milliseconds (default: 100).
     * @returns {Promise<Array>} A promise that resolves to an array of unique jokes.
     * @throws {Error} If the API request fails.
     */

    async function getJokes(numOfJokes = 10, awaitTime = 100){
        let uniqueJokes = [];

        while(uniqueJokes.length < numOfJokes){

            try{
                const jokeResponse = await chuckNorrisApi.getRandomJoke();

                if (!uniqueJokes.includes(jokeResponse.data)){
                    uniqueJokes.push(jokeResponse.data);
                }

                await sleep(awaitTime);
            } catch (e) {
                throw e;
            }
        }

        return uniqueJokes;
    }

    /**
     * Gets a joke question by its ID.
     * @param {string} id - The joke question ID.
     * @returns {Array<JokeQuestion>} Array containing the matching joke question.
     */

    function getJokeQuestionById(id){
        return jokeTest.value.jokeQuestions.filter((question) => id === question.id);
    }

    /**
     * Submits an answer for a specific question.
     * @param {Array<string>} answer - Array of answer strings.
     * @param {string} questionId - The ID of the question being answered.
     */

    function answerQuestion(answer,questionId){
        jokeTest.value.jokeQuestions.filter((question) => questionId === question.id)[0].submitAnswer(answer);

        answeredQuestions.value += currentJokeQuestion.value.numRedactedWords;
    }

    /**
     * Creates a new joke test with random Chuck Norris jokes.
     * @param {number} numOfQuestions - Number of questions for the test (default: 10).
     * @returns {Promise<Object>} A promise that resolves with the test data.
     * @throws {Error} If joke fetching fails.
     */

    async function craftJokeTest(numOfQuestions = 10){
        try {
            let uniqueJokes = await getJokes(numOfQuestions);

            const uniqueJokeQuestions = [...await Promise.all(uniqueJokes)].map((joke) => {
                  return {
                    "id": uuidv4(),
                    "joke": {
                        ...joke
                    }
                }
            });

            return {"data": {"id": uuidv4(), "jokeQuestions": [...await Promise.all(uniqueJokeQuestions)]}};

        } catch (e) {
            throw e;
        }
    }

    /**
     * Creates a new joke test entity from test data.
     * @param {Object} test - The test data from API.
     */

    function createNewJokeTest(test){
        jokeTest.value = JokeTestAssembler.toEntityFromResource(test);
        currentJokeQuestion.value = jokeTest.value.jokeQuestions[0];
        console.log(jokeTest.value);
        console.log(currentJokeQuestion.value);
    }

    /**
     * Resets all game state to initial values.
     */

    function resetGame(){
        jokeTest.value = null;
        errors.value = [];
        jokeTestLoaded.value = false;
        currentJokeQuestion.value = null;
        testIsFinished.value = false;
        totalScore.value = 0;
        answeredQuestions.value = 0;
        submittedAnswers.value = 0;
    }

    return {
        jokeTest,
        errors,
        jokeTestLoaded,
        fetchJokeTest,
        craftJokeTest,
        createNewJokeTest,
        getJokeQuestionById,
        answerQuestion,
        nextQuestion,
        currentJokeQuestion,
        submittedAnswers,
        testIsFinished,
        totalScore,
        answeredQuestions,
        resetGame
    }
})

export default useJokesStore;