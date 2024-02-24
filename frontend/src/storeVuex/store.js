import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        produse: [],
        user: []
    },
    mutations: {
        SET_PRODUSE(state, produse) {
            state.produse = produse;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_PRODUSE_USER(state, produse_user) {
            state.produse_user = produse_user;
        },

    },
    actions: {
        async fetchProduse({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/getAllProduse', {
                  }, {
                    headers: {
                      "Content-Type": "application/json",
                    //   Authorization: "Bearer " + firebaseUserIdToken,
                    }
                  });
                commit('SET_PRODUSE', response.data);
            } catch (error) {
                console.error('Eroare la obținerea datelorproduselor:', error);
            }
        },

        async fetchProduseUser({ commit }, userId) {
            try {    
                const response = await axios.post('http://localhost:3000/getProductsByUser', {userId});
                console.log(response);
                SET_PRODUSE_USER('SET_PRODUSE', response.data);
            } catch (error) {
                console.error('Eroare la obținerea datelor produselor:', error);
            }
        },

        async fetchUser({ commit }, email) {
            try {
                const response = await axios.post('http://localhost:3000/getUser', { email });
                commit('SET_USER', response.data);
            } catch (error) {
                console.error('Eroare la obținerea datelor utilizatorului:', error);
            }
        },

        async createUser({ commit }, userData) {
            try {
                const response = await axios.post('http://localhost:3000/createUser', userData);
                commit('SET_USER', response.data);
                console.log('Utilizator creat cu succes!');
            } catch (error) {
                console.error('Eroare la crearea utilizatorului:', error);
            }
        }
    },
    getters: {
        getProduse: state => state.produse,
        getUser: state => state.user,
        getProduseUser: state => state.produse_user,
    }
});
