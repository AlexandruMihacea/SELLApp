<script>
import { RouterLink } from 'vue-router'

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCUU0BGSMp6FtKhI2lcPrfBc2bshZvQOV0",
  authDomain: "sellapp-8c660.firebaseapp.com",
  projectId: "sellapp-8c660",
  storageBucket: "sellapp-8c660.appspot.com",
  messagingSenderId: "828753889284",
  appId: "1:828753889284:web:2b4e83335cb7f29abf0d51"
};

initializeApp(firebaseConfig);

const user = getAuth()


export default {
  data() {
    return {
      isLoggedIn: false, 
      username: '' 
    };
  },
  methods: {
    logout() {
       signOut(getAuth());
    }
  },
  mounted(){
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.username = user.displayName; 
      } else {
        this.isLoggedIn = false;
        this.username = ''; 
      }
    });
  }
};
</script>

<template>
    <header class="header">
      <div class="logo">
        <img src="../assets/SELL.png" alt="Logo" />
      </div>
      <div class="user-section">
        <template v-if="isLoggedIn">
        
          <RouterLink to="/profil" class="btns">Profil</RouterLink>
          <RouterLink to="/" class="btns">Acasa</RouterLink>
          <button @click="logout">Deconectare</button>
          
        </template>
        <template v-else>
    
            <RouterLink to="/" class="btns">Acasa</RouterLink>
            <RouterLink to="/login" class="btns">Login</RouterLink>
            <RouterLink to="/register" class="btns">Register</RouterLink>
        
        </template>
      </div>
    </header>
  </template>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #839276be;
    color: #fff;
    border-bottom: 2px black solid;
    max-height: 100px;
    align-items: center;
  }
  
  .logo img {
    max-width: 200px;
  }
  
  .user-section {
    display: flex;
    align-items: center;
  }
  
  .user-section span {
    margin-right: 10px;
  }

  .btns{
    color: black;
    padding-right: 10px;
  }
  </style>
  