<script>
  import { baseAPI, rpc } from 'pyloid-js';

  let message = '';
  
  async function handleGreet() {
    message = await rpc.call('greet', { name: 'John' });
  }
</script>

<div id="root">
  <div>
    <img src="/pyloid_icon.png" class="logo pyloid" alt="Pyloid logo" />
  </div>
  
  <h1>Pyloid App</h1>
  
  <div class="card">
    <button class="action-button" on:click={handleGreet}>
      Greet
    </button>
    <button class="action-button" on:click={() => rpc.call('create_window')}>
      Create Window
    </button>
    <button class="action-button" on:click={() => baseAPI.close()}>
      Close
    </button>
  </div>
  
  <div>
    <p>{message}</p>
    <a href="https://pyloid.com">Visit Pyloid</a>
  </div>
</div>

<style>
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    height: 100%;
    width: 100%;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    max-width: 1280px;
    height: 100%;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
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

  button {
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
  
  button:hover {
    border-color: #646cff;
  }
  
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  a {
    color: #646cff;
    text-decoration: inherit;
    font-weight: 500;
  }
  
  a:hover {
    color: #535bf2;
  }

  /* Light mode styles */
  @media (prefers-color-scheme: light) {
    :global(body) {
      color: #213547;
      background-color: #ffffff;
    }
    
    a:hover {
      color: #747bff;
    }
    
    button {
      background-color: #f9f9f9;
    }
  }

  @media (max-width: 640px) {
    .card {
      flex-direction: column;
    }
  }
</style>
