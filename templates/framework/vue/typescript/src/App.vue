<script setup lang="ts">
async function createWindow() {
  await window.pyloid.CustomAPI.createWindow()
}
async function closeWindow() {
  await window.pyloid.WindowAPI.close()
}
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <a href="https://docs.pyloid.com" target="_blank">
      <img src="./assets/pyloid_icon.png" class="logo pyloid" alt="Pyloid logo" />
    </a>
  </div>
  <h1>Vite + Vue + Pyloid</h1>
  <div class="card">
    <button @click="createWindow">
      Create Window
    </button>
    <button @click="closeWindow">Close</button>
    <p>
      Edit <code>src/App.vue</code> and save to test HMR
    </p>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.logo.pyloid:hover {
  filter: drop-shadow(0 0 2em #92e7ffaa);
}
</style>
