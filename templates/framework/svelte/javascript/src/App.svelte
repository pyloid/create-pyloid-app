<script>
  import { baseAPI, rpc } from 'pyloid-js';
  import pyloidLogo from './assets/pyloid_icon.png';
  
  let message = '';
  
  async function handleGreet() {
    message = await rpc.call('greet', { name: 'John' });
  }
  
  function createWindow() {
    rpc.call('create_window');
  }
  
  function closeApp() {
    baseAPI.close();
  }
</script>

<div>
  <img src={pyloidLogo} class="logo pyloid" alt="Pyloid logo" />
</div>
<h1>Pyloid App</h1>
<div class="card">
  <button class="action-button" on:click={handleGreet}>
    Greet
  </button>
  <button class="action-button" on:click={createWindow}>
    Create Window
  </button>
  <button class="action-button" on:click={closeApp}>
    Close
  </button>
</div>
<div>
  <p>{message}</p>
  <a href="https://pyloid.com">Visit Pyloid</a>
</div>

<style>
  :global(#app) {
    max-width: 1280px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .logo {
    height: 12em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  
  .logo.pyloid:hover {
    filter: drop-shadow(0 0 2em #92e7ffaa);
  }
  
  .card {
    padding: 2em;
    display: flex;
    gap: 1em;
    align-items: center;
  }
  
  :global(button) {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  
  :global(button:hover) {
    border-color: #646cff;
  }
  
  :global(button:focus),
  :global(button:focus-visible) {
    outline: 4px auto -webkit-focus-ring-color;
  }
  
  @media (prefers-color-scheme: light) {
    :global(:root) {
      color: #213547;
      background-color: #ffffff;
    }
    :global(a:hover) {
      color: #747bff;
    }
    :global(button) {
      background-color: #f9f9f9;
    }
  }
</style>
