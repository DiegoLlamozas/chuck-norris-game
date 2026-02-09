<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
const unavailableRoute = router.currentRoute.value.fullPath;
</script>

<template>
  <div class="align-content-start justify-content-start m-4">
    <h1>Page Not Found</h1>
    <p>{{ `The path ${unavailableRoute} you are looking for does not exist.` }}</p>
    <router-link to="/jokes">Go Home</router-link>
  </div>
</template>

<style scoped>

</style>