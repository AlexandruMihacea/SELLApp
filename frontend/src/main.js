import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../src/storeVuex/store';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCUU0BGSMp6FtKhI2lcPrfBc2bshZvQOV0",
  authDomain: "sellapp-8c660.firebaseapp.com",
  projectId: "sellapp-8c660",
  storageBucket: "sellapp-8c660.appspot.com",
  messagingSenderId: "828753889284",
  appId: "1:828753889284:web:2b4e83335cb7f29abf0d51"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
