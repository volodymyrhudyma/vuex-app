<template>
    <div class="value">
        <div class="heading">
            <navbar></navbar>
        </div>
        <div class="content">
            <p>Home page/</p>
            <p v-if="isLoggedIn">Logged in</p>
            <p v-if="!isLoggedIn">Unlogged</p>
        </div>
    </div>
</template>

<script>
    import Navbar from './Navbar.vue'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            Navbar
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