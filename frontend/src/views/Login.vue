<template>
    <div class="login-container">
      <h2>Autentificare</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Utilizator:</label>
          <input type="text" id="username" v-model="username" placeholder="Introdu utilizatorul" required>
        </div>
        <div class="form-group">
          <label for="password">Parolă:</label>
          <input type="password" id="password" v-model="password" placeholder="Introdu parola" required>
        </div>
        <button type="submit">Autentificare</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        console.log('Utilizator:', this.username);
        console.log('Parolă:', this.password);
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;

  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  