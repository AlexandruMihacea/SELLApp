import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        produse: []
    },
    mutations: {
        SET_PRODUSE(state, produse) {
            state.produse = produse;
        }
    },
    actions: {
        async fetchProduse({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/getAllProduse');
                commit('SET_PRODUSE', response.data);
            } catch (error) {
                console.error('Eroare la obținerea datelorproduselor:', error);
            }
        }
    },
    getters: {
        getProduse: state => state.produse
    }
});
