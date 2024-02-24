<template>
    <div class="products-container">
      <div class="product-card" v-for="product in produse" :key="product.id">
        <img :src="product.downloadLink" alt="Product Image" class="product-image">
        <div class="product-details">
          <h3 class="product-title">{{ product.titlu }}</h3>
          <p class="product-description">{{ product.descriere }}</p>
          <p class="product-price">{{ product.pret }} LEI</p>
          <p class="product-price">{{ product.id }} LEI</p>
          <button @click="deleteProduct(product.id)">Șterge produsul</button>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { watchEffect, computed } from 'vue';
  import axios from 'axios';

  export default {

    setup() {
        const store = useStore();
        const user = store.getters.getUser;
        const produse = computed(() => store.getters.getProduse);

        const fetchProduse = async (parametru) => {
            await store.dispatch('fetchProduseUser', parametru);
        };

        watchEffect(async () => {

            await fetchProduse(user.id)
        });
        return {
            user,
            produse,
            fetchProduse
        };
    },

    methods: {
        async deleteProduct(productId) {
            try {
                const response = await axios.delete(`http://localhost:3000/delete-product`, { data: { productId } });
                
                console.log('Produsul a fost șters cu succes!');
                await this.fetchProduse(this.user.id);
            } catch (error) {
                console.error('Eroare la ștergerea produsului:', error);
            }
        }
    }
  };
  </script>
  
  <style scoped>
  .products-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .product-card {
    margin-top: 20px;
    width: 300px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
  }
  
  .product-image {
    width: 100%;
    max-height: 250px;
    border-radius: 5px;
  }
  
  .product-title {
    font-size: 20px;
    margin-bottom: 5px;
  }
  
  .product-description {
    margin-bottom: 10px;
  }
  
  .product-price {
    font-weight: bold;
  }
  </style>
  