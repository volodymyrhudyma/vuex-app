<template>
    <div class="navbar">
        <nav>
            <div class="nav-wrapper">
              <a href="/#/home" class="brand-logo">Vue</a>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li v-if="!isLoggedIn">
                    <router-link to="/login">Login</router-link>
                </li>
                <li v-if="isLoggedIn">
                    <a href="#" @click="logout">Logout</a> 
                </li>
              </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        methods: {
            ...mapActions(['logout'])
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