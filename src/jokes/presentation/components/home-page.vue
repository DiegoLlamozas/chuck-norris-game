<script setup>
import {useRouter, useRoute} from "vue-router";
import useJokesStore from "../../application/jokes.store.js";
import {computed,onMounted,ref} from "vue";
import {JokeTest} from "../../domain/model/joke-test.entity.js";

const route = useRoute();
const router = useRouter();
const store = useJokesStore();
const {errors} = store;

/** @type {import('vue').Ref<boolean>} */
const isLoading = ref(false);

onMounted(() => {
  console.log(route);

})

/**
 * Creates a new joke test and navigates to the test page.
 * @param {number} numOfQuestions - Number of questions for the test (default: 10).
 * @returns {Promise<void>}
 */

const createNewTest = async (numOfQuestions = 10) => {
  isLoading.value = true;

  store.resetGame();

  const newTestResponse = await store.craftJokeTest(numOfQuestions);

  await store.createNewJokeTest(newTestResponse);

  await router.push({name: 'jokes-test'})

}
</script>

<template>
  <div class="p-4" v-if="!isLoading">
    <h1>TEST YOUR <span>CHUCK NORRIS</span> KNOWLEDGE</h1>

    <pv-button @click.once="createNewTest(10)" class="custom-button">
      <b>Create Test</b>
    </pv-button>
  </div>

  <div v-if="isLoading"  class="loading-container">
    <h1>Loading Test . . .</h1>
  </div>

</template>

<style scoped>

span{
  color: var(--color-crimson-400);
}
.loading-container {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

</style>