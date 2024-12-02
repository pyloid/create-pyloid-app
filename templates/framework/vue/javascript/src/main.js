import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

document.addEventListener('pyloidReady', () => {
  createApp(App).mount('#app');
});
