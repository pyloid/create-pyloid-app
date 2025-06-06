'use client';

import { useState } from 'react';
import { baseAPI, rpc } from 'pyloid-js';

export default function Home() {
  const [message, setMessage] = useState('');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#242424] text-[rgba(255,255,255,0.87)] p-8 font-sans'>
      <div className='mb-8'>
        <img
          src='/pyloid_icon.png'
          alt='Pyloid logo'
          className='h-24 w-24 transition-all duration-300 hover:brightness-110 hover:contrast-125'
        />
      </div>

      <h1 className='text-4xl font-bold mb-8'>Pyloid App</h1>

      <div className='flex flex-col sm:flex-row gap-4 mb-8'>
        <button
          className='bg-[#1a1a1a] text-white px-5 py-2.5 rounded-lg border border-transparent transition-colors duration-250 hover:border-[#646cff] focus:outline-none focus:ring-4 focus:ring-[#646cff44]'
          onClick={async () => {
            const responseMessage = await rpc.call('greet', { name: 'John' });
            setMessage(responseMessage);
          }}
        >
          Greet
        </button>
        <button
          className='bg-[#1a1a1a] text-white px-5 py-2.5 rounded-lg border border-transparent transition-colors duration-250 hover:border-[#646cff] focus:outline-none focus:ring-4 focus:ring-[#646cff44]'
          onClick={() => rpc.call('create_window')}
        >
          Create Window
        </button>
        <button
          className='bg-[#1a1a1a] text-white px-5 py-2.5 rounded-lg border border-transparent transition-colors duration-250 hover:border-[#646cff] focus:outline-none focus:ring-4 focus:ring-[#646cff44]'
          onClick={() => baseAPI.close()}
        >
          Close
        </button>
      </div>

      <div className='text-center'>
        <p className='mb-4 min-h-[1.5em]'>{message}</p>
        <a
          href='https://pyloid.com'
          className='text-[#646cff] hover:text-[#535bf2] transition-colors duration-250'
        >
          Visit Pyloid
        </a>
      </div>
    </div>
  );
}
