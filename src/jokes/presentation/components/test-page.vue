<script setup>
import {useRouter, useRoute } from "vue-router";
import useJokesStore from "../../application/jokes.store.js";
import {onMounted, ref, computed, watch} from "vue";

const router = useRouter();
const route = useRoute();
const store = useJokesStore();
const {jokeTestLoaded, currentJokeQuestion, submittedAnswers, errors} = store;

/** @type {import('vue').Ref<Array<string>>} */
const answers = ref([""]);

onMounted(() => {

  if (!jokeTestLoaded)
  {
    store.fetchJokeTest()
  }

})

/**
 * Gets a joke question by its ID.
 * @param {string} id - The question ID.
 * @returns {Array} Array containing the matching question.
 */

function getQuestion(id){
  return store.getJokeQuestionById(id);
}

/**
 * Submits answers for the current question.
 */

function getAnswer(){

  store.answerQuestion(answers.value,store.currentJokeQuestion.id);

}

/**
 * Advances to the next question in the test.
 */

function goToNextQuestion(){
  answers.value= [""];

  store.nextQuestion();
}

/**
 * Navigates back to the home page.
 */

function goBack() {
  router.push({name: 'jokes-home'});
}

/**
 * Computes the CSS class for the final score based on percentage.
 * @type {import('vue').ComputedRef<string>}
 */

const finalScoreClass = computed(() => {
  if (store.answeredQuestions === 0) return 'default-score';

  const scorePercentage = ((store.totalScore / store.answeredQuestions) * 100);

  if (scorePercentage <= 50.00) {
    return 'low-score';
  } else if (scorePercentage <= 80.00) {
    return 'medium-score';
  } else if (scorePercentage >= 100.00) {
    return 'perfect-score';
  } else {
    return 'high-score';
  }
});

/**
 * Checks if the player achieved a perfect score.
 * @type {import('vue').ComputedRef<boolean>}
 */

const isPerfectScore = computed(() => {
  if (store.answeredQuestions === 0) return false;
  const scorePercentage = (store.totalScore / store.answeredQuestions) * 100;
  return scorePercentage >= 100.00;
});


</script>

<template>
  <pv-card class="m-2" v-if="!store.testIsFinished">
    <template #header>
      <h3 class="flex align-content-center flex-wrap">
        {{ store.currentJokeQuestion.redactedJoke }}

      </h3>

    </template>


    <template #content>
      <div v-if="!store.currentJokeQuestion.answerIsSubmitted">
        <form @submit.prevent="getAnswer">
          <div v-for="(word,i) in store.currentJokeQuestion.redactedWords">
            <pv-input-text v-model="answers[i]" placeholder="Insert your answer" required/>
          </div>

          <pv-button type="submit">Submit</pv-button>
        </form>
      </div>


    </template>

    <template #footer>
      <div v-if="store.currentJokeQuestion.answerIsSubmitted">


        <div class="answers-container">
          <pv-card class="answer-card your-answers">
            <template #header>
              <h4>YOUR ANSWERS</h4>
            </template>
            <template #content>
              <ul class="answer-list">
                <li v-for="(answer, index) in answers" :key="index">
                  {{ answer || "(Empty)" }}
                </li>
              </ul>
            </template>
          </pv-card>

          <pv-card class="answer-card correct-answers">
            <template #header>
              <h4>CORRECT ANSWERS</h4>
            </template>
            <template #content>
              <ul class="answer-list">
                <li v-for="(word, index) in store.currentJokeQuestion.redactedWords" :key="index">
                  {{ word }}
                </li>
              </ul>
            </template>
          </pv-card>
        </div>

        <h4>Your Score</h4>

        <p>{{ store.currentJokeQuestion.calcScore() }}</p>

        <pv-button @click="goToNextQuestion">
          <b>Next Question</b>
        </pv-button>
      </div>


    </template>
  </pv-card>

  <div v-if="store.testIsFinished">
    <h1>GAME OVER</h1>

    <div class="game-over-container">
      <pv-card :class="finalScoreClass">
        <template #header>
          <p class="final-score">{{ store.totalScore }} out of {{ store.answeredQuestions }}</p>
        </template>
        <template #content>
          <p class="final-score">{{((store.totalScore/store.answeredQuestions) * 100.00).toFixed(2)}}% </p>
        </template>
      </pv-card>

      <div v-if="isPerfectScore" class="perfect-score-gif">
        <img
            src="https://media.tenor.com/2-AEeBY5wgwAAAAM/chuck-norris-thumbs-up.gif"
            alt="Chuck Norris approves"
            class="celebration-gif"
        />
      </div>
    </div>

    <pv-button @click="goBack"><b>Start Again</b></pv-button>
  </div>

</template>

<style scoped>
p{
  color: var(--color-white);
}
.answers-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 1.5rem 0;
  justify-content: space-between;
}

.answer-card {
  flex: 1 1 30%;
  min-width: 300px;
  box-sizing: border-box;
  border: 1.5px;
}

.answer-card.your-answers{
  background-color: var(--color-dark-gray-2) !important;
}

.answer-card.correct-answers{
  background-color: var(--color-prussian-blue) !important;
  border-color: var(--color-persian-blue) !important;
}

.answer-card.correct-answers :deep(h4) {
  color: var(--color-baby-blue-ice) !important;
}

.answer-list {
  list-style-type: none; /* Removes default bullets */
  padding-left: 0;
  margin: 0;
}

.answer-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-white);
  font-family: var(--font-oswald);
  font-size: var(--text-20);
}

.answer-list li:last-child {
  border-bottom: none;
}

:deep(.low-score.p-card) {
  background-color: var(--color-midnight-violet) !important;
  border: 2px solid !important;
  border-color: var(--color-deep-crimson) !important;
  box-sizing: border-box;
}

:deep(.medium-score.p-card) {
  background-color: var(--color-prussian-blue) !important;
  border-color: var(--color-persian-blue) !important;
  border: 2px solid !important;
  box-sizing: border-box;
}

:deep(.high-score.p-card) {
  background-color: var(--color-graphite) !important;
  border-color: var(--color-mustard) !important;
  border: 2px solid !important;
  box-sizing: border-box !important;
}

.game-over-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 750px;
  margin: 2rem auto;
}

.game-over-container :deep(.p-card) {
  flex: 0 1 auto !important;
  min-width: unset !important;
  max-width: 500px !important;
  width: 100% !important;
  margin: 0 auto !important;
}

.game-over-container :deep(.p-card .final-score) {
  font-family: var(--font-bebas-neue) !important;
  font-weight: var(--font-900) !important;
  letter-spacing: var(--tracking-08) !important;
  text-align: center !important;
  margin: 0 !important;
  line-height: 1.2 !important;
}

/* HEADER (Score X out of Y) */
.game-over-container :deep(.p-card .p-card-header .final-score) {
  font-size: var(--text-40) !important;
  margin-bottom: 0.5rem !important;
  text-transform: uppercase !important;
}

.game-over-container :deep(.p-card .p-card-content .final-score) {
  font-size: var(--text-60) !important;
  display: block !important;
}


:deep(.low-score.p-card) {
  background-color: var(--color-midnight-violet);
  border: 3px solid var(--color-deep-crimson) !important;
}

:deep(.low-score.p-card .final-score) {
  color: #fca5a5 !important; /* Soft red */
}

:deep(.medium-score.p-card) {
  background-color: var(--color-prussian-blue) !important;
  border: 3px solid var(--color-persian-blue) !important;

}

:deep(.medium-score.p-card .final-score) {
  color: #93c5fd !important;

}

:deep(.high-score.p-card), :deep(.perfect-score.p-card)  {
  background: var(--color-graphite) !important;
  border: 3px solid var(--color-mustard) !important;
}

:deep(.high-score.p-card .final-score), :deep(.perfect-score.p-card .final-score)  {
  color: #fde68a !important; /* Light mustard */
}

.perfect-score-gif {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 2rem auto;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

.celebration-gif {
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  margin: 1rem;
}


@media (max-width: 768px) {
  .answer-card {
    flex: 1 1 100%;
  }
}

:deep(.p-card) {
  height: 100%;
}

</style>