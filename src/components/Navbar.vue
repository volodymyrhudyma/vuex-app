<template>
    <div class="navbar">
        <nav>
            <div class="nav-wrapper">
              <a href="#" class="brand-logo">Vue</a>
              <ul id="nav-mobile" class="right hide-on-med-and-down">                
                <li v-if="!isLoggedIn">
                    <router-link to="/login">{{ $t('Login') }}</router-link>
                </li>
                <li v-if="isLoggedIn">
                    <router-link to="/projects">{{ $t('Projects') }}</router-link>
                </li>
                <li v-if="isLoggedIn">
                    <router-link to="/issues">{{ $t('Issues') }}</router-link>
                </li>
                <li v-if="isLoggedIn">
                    <router-link to="/tasks">{{ $t('Tasks') }}</router-link>
                </li>
                <li v-if="isLoggedIn">
                    <router-link to="/technologies">{{ $t('Technologies') }}</router-link>
                </li>
                <li v-if="isLoggedIn">
                    <a href="#" @click="logout">{{ $t('Logout') }}</a> 
                </li>
                <li v-if="isLoggedIn">
                    <div class="fixed-action-btn horizontal click-to-toggle">
                        <a class="btn-floating btn-large red">
                           <i class="material-icons">menu</i>
                        </a>
                        <ul>
                            <li>
                                <a class="btn-floating red" v-on:click="setLanguage('ua')">
                                    <i class="material-icons">language</i>
                                    {{ $t('Ukrainian') }}
                                </a>
                            </li>
                            <li>
                                <a class="btn-floating red">
                                    <i class="material-icons" v-on:click="setLanguage('en')">language</i>
                                    {{ $t('English') }}
                                </a>
                            </li>
                        </ul>
                      </div>
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
            ...mapActions(['logout', 'setLanguage'])
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