<template>
    <ul class="product-list">
        <loader v-if="isFetching"></loader>
        <li v-for="product in allProducts" class="item">
            <div class="field">
                {{product.id}}
            </div>
            <div class="field">
                {{product.title}}
            </div>
            <div class="field">
                {{product.body}}
            </div>
            <div class="field">
                {{product.userId}}
            </div>
        </li>
    </ul>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Loader from './Loader.vue'
    
    export default {        
        computed: {
            ...mapGetters(['allProducts', 'isFetching'])
        },
        methods: {
            ...mapActions(['fetchProducts'])
        },
        components: {
            Loader
        },
        beforeMount() {
            this.fetchProducts();
        }
    }
</script>

<style lang="scss">
    ul {
        margin: 0;
    }
</style>