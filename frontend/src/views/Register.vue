<template>
    <div class="register-container">
      <h2>Înregistrare</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="firstName">Prenume:</label>
          <input type="text" id="firstName" v-model="firstName" placeholder="Introduceți prenumele" required>
        </div>
        <div class="form-group">
          <label for="lastName">Nume:</label>
          <input type="text" id="lastName" v-model="lastName" placeholder="Introduceți numele" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" placeholder="Introduceți adresa de email" required>
        </div>
        <div class="form-group">
          <label for="location">Locație:</label>
          <input type="text" id="location" v-model="location" placeholder="Introduceți locația" required>
        </div>
        <div class="form-group">
          <label for="phone">Telefon:</label>
          <input type="tel" id="phone" v-model="phone" placeholder="Introduceți numărul de telefon" required>
        </div>
        <div class="form-group">
          <label for="password">Parolă:</label>
          <input type="password" id="password" v-model="password" placeholder="Introdu parola" required>
        </div>
        <div class="form-group">
          <label for="profileImage">Imagine de profil:</label>
          <input type="file" id="profileImage" @change="handleImageUpload">
        </div>
        <button type="submit">Înregistrare</button>
      </form>
    </div>
  </template>
  
  <script>
  import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

  import { useStore } from 'vuex';

  const store = useStore();

  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        phone: '',
        profileImage: null
      };
    },
    methods: {
      register() {
        
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((res) => {
            console.log("Inregistrare realizata cu succes!")
            this.$store.dispatch('createUser', {
              prenume: this.firstName,
              nume: this.lastName,
              email: this.email,
              locatie: this.location,
              telefon: this.phone,
              filename: this.profileImage
            });
        })
        .catch((err) => {
            console.error(err)
            alert(err.message);
        })
      },
      handleImageUpload(event) {
        this.profileImage = event.target.files[0];
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="tel"],
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
  