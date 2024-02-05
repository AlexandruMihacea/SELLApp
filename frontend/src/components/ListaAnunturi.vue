<script>
    import { computed, watchEffect } from 'vue';
    import { useStore } from 'vuex';

    export default {
    setup() {
        const store = useStore();
        const produse = computed(() => store.getters.getProduse);

        watchEffect(() => {
            store.dispatch('fetchProduse');
        });

        return {
            produse
        };
    }
    };
</script>


<template>
    <div class="container">
        <h1>Lista Anunturilor</h1>
        <div class="cards">
            {{ produse }}
        </div>
    </div>
</template>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>