import pyloidLogo from './assets/pyloid_icon.png';
import './App.css';
import { baseAPI, rpc } from 'pyloid-js';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  return (
    <>
      <div>
        <img src={pyloidLogo} className='logo pyloid' alt='Pyloid logo' />
      </div>
      <h1>Pyloid App</h1>
      <div className='card'>
        <button
          className='action-button'
          onClick={async () => {
            const message = await rpc.call('greet', { name: 'John' });
            setMessage(message);
          }}
        >
          Greet
        </button>
        <button
          className='action-button'
          onClick={() => rpc.call('create_window')}
        >
          Create Window
        </button>
        <button className='action-button' onClick={() => baseAPI.close()}>
          Close
        </button>
      </div>
      <div>
        <p>{message}</p>
        <a href='https://pyloid.com'>Visit Pyloid</a>
      </div>
    </>
  );
}

export default App;
