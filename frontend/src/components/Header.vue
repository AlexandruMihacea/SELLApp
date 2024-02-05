<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      isLoggedIn: false, // Setează la true dacă utilizatorul este autentificat
      username: '' // Numele utilizatorului autentificat
    };
  },
  methods: {
    logout() {
      // Implementează funcția de deconectare
      // Poate include logica pentru a seta isLoggedIn la false și a șterge datele de utilizator
    }
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
         
          <span>Bun venit, {{ username }}!</span>
          <button @click="logout">Deconectare</button>
          
        </template>
        <template v-else>
    
            <RouterLink to="/" class="btns">Home</RouterLink>
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
  