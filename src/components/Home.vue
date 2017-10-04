<template>
    <div class="value">
        <div class="heading">
            <navbar></navbar>
        </div>
        <div class="content">
            <div v-if="!isLoggedIn" class="unlogged">
                Home page, please log in
            </div>
            <musician-list v-if="isLoggedIn"></musician-list>
        </div>
    </div>
</template>

<script>
    import Navbar from './Navbar.vue'
    import MusicianList from './MusicianList.vue'
    import { mapGetters } from 'vuex'
    
    export default {        
        components: {
            Navbar,
            MusicianList
        },
        computed: {
            ...mapGetters(['isLoggedIn'])
        }
    }
</script>

<style lang="scss">
    nav .brand-logo {
        padding: 0 15px;
    }
</style>