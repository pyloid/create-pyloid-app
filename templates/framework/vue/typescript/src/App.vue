<script setup>
import { ref } from 'vue';
import { baseAPI, rpc } from 'pyloid-js';
import pyloidLogo from './assets/pyloid_icon.png';

const message = ref('');

</script>

<template>
  <div class="app-container">
    <div class="logo-container">
      <img :src="pyloidLogo" class="logo pyloid" alt="Pyloid logo" />
    </div>

    <h1>Pyloid App</h1>

    <div class="card">
      <button
        @click="async () => {
          const responseMessage = await rpc.call('greet', { name: 'John' });
          message = responseMessage;
        }"
      >
        Greet
      </button>
      <button @click="() => rpc.call('create_window')">
        Create Window
      </button>
      <button @click="() => baseAPI.close()">
        Close
      </button>
    </div>

    <div class="info-section">
      <p class="message">{{ message }}</p>
      <a
        href="https://pyloid.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit Pyloid
      </a>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
}

.logo-container {
  margin-bottom: 2rem;
}

.logo {
  height: 8em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo.pyloid:hover {
  filter: drop-shadow(0 0 2em #92e7ffaa);
}

h1 {
  margin-bottom: 2rem;
}

.card {
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .card {
    flex-direction: row;
  }
}

.info-section {
  text-align: center;
}

.message {
  margin-bottom: 1rem;
  min-height: 1.5em;
}

</style>