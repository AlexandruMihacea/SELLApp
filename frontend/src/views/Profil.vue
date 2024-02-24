<template>
    <div class="profile-container">
      <div class="profile-header">
        <img :src="user.imagineProfilUrl" class="profile-image" alt="Profile Image" />
        <h2>{{ user.nume }} {{ user.prenume }}</h2>
      </div>
      <div class="profile-info">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Locație:</strong> {{ user.locatie }}</p>
        <p><strong>Telefon:</strong> {{ user.telefon }}</p>
      </div>
      <RouterLink to="/produseUser" class="btns">Produsele tale</RouterLink>
    </div>
    
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { computed, watchEffect } from 'vue';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { RouterLink } from 'vue-router'
  
  const user = getAuth()

  let userEmail = ''; 

  onAuthStateChanged(user, (currentUser) => {
    if (currentUser) { 
        userEmail = currentUser.email; 
    } 
});

  export default {
    setup() {
        const store = useStore();
        const fetchUser = async (parametru) => {
            await store.dispatch('fetchUser', parametru);
        };

        const user = computed(() => {
            const userData = store.getters.getUser;
            return userData ? userData : {};
        });
        watchEffect(async () => {
            await fetchUser(userEmail)
        });
        return {
            user
        };
    },
    
};
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .profile-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%; /* Rotunjirea imaginii de profil */
    object-fit: cover;
  }
  
  .profile-info p {
    margin-bottom: 10px;
  }
  </style>
  