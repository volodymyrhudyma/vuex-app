<template>
    <ul class="musician-list">
        <loader v-if="isFetching"></loader>
        <li v-for="musician in allMusicians" class="item">
            <div class="field">
                {{musician.id}}
            </div>
            <div class="field">
                {{musician.name}}
            </div>
            <div class="field">
                {{musician.band}}
            </div>
        </li>
    </ul>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Loader from './Loader.vue'
    
    export default {        
        computed: {
            ...mapGetters(['allMusicians', 'isFetching'])
        },
        methods: {
            ...mapActions(['fetchMusicians'])
        },
        components: {
            Loader
        },
        beforeMount() {
            this.fetchMusicians();
        }
    }
</script>

<style lang="scss">
    ul {
        margin: 0;
    }
</style>