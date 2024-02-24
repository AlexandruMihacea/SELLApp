<script>
    import { computed, watchEffect } from 'vue';
    import { useStore } from 'vuex';
    import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';


    export default {
    setup() {
        const store = useStore();
        const produse = computed(() => store.getters.getProduse);
        // const user = getAuth()
        // const firebaseUserIdToken = user.currentUser.getIdToken(true)

        watchEffect(() => {
            // console.log(firebaseUserIdToken)
            store.dispatch('fetchProduse');
        });

        return {
            produse
        };
    },
    };
</script>


<template>
    <div class="container">
                <div v-for="(produs, index) in produse" :key="index" class="card-iterator">
                    <div class="card-container">
                        <img :src=produs.downloadLink alt="imagine produs" class="image-style"/>
                        <h2>{{ produs.titlu }}</h2>
                        <h4>{{ produs.descriere }}</h4>
                        <h3>{{ produs.pret }} LEI</h3>
                    </div>
                </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.card-iterator {
    width: calc(25% - 20px); 
    margin-bottom: 20px;
}

.card-container {
    background-color: #00BF63; 
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    margin: 5px;
}

.image-style {
    width: 100%;
    max-height: 200px;
    border-radius: 8px;
}

h2, h4, h3 {
    color: black;
    margin: 10px 0;
}

@media screen and (max-width: 1200px) {
    .card-iterator {
        width: calc(33.33% - 20px); 
    }
}

@media screen and (max-width: 800px) {
    .card-iterator {
        width: calc(50% - 20px); 
    }
}

@media screen and (max-width: 600px) {
    .card-iterator {
        width: calc(100% - 20px); 
    }
}
</style>
