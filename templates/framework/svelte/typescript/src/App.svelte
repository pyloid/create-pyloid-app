<script>
  import viteLogo from '/vite.svg';
  import svelteLogo from './assets/svelte.svg';
  import pyloidLogo from './assets/pyloid_icon.png';

  function createWindow() {
    window.pyloid.CustomAPI.createWindow();
  }

  function closeWindow() {
    window.pyloid.WindowAPI.close();
  }
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank">
      <img src={svelteLogo} class="logo svelte" alt="Svelte logo" />
    </a>
    <a href="https://react.dev" target="_blank">
      <img src={pyloidLogo} class="logo pyloid" alt="Pyloid logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <button on:click={createWindow}>Create Window</button>
    <button on:click={closeWindow}>Close</button>
    <p>
      Edit <code>src/App.svelte</code> and save to test HMR
    </p>
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .logo.pyloid:hover {
    filter: drop-shadow(0 0 2em #92e7ffaa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
