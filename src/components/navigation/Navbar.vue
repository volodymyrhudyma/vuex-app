<template>

    <div class="phone-viewport">

        <md-toolbar>
          <md-button class="md-icon-button" @click="toggleLeftSidenav">
            <md-icon>menu</md-icon>
          </md-button>

          <h2 class="md-title" style="flex: 1">Menu</h2>

          <md-button class="md-icon-button" @click="toggleRightSidenav">
            <md-icon>exit_to_app</md-icon>
          </md-button>
        </md-toolbar>

        <md-sidenav class="md-left" ref="leftSidenav">
          <md-toolbar class="md-large">
              <md-list class="md-transparent" v-if="isLoggedIn">
              
                <md-list-item class="md-avatar-list">
                  <md-avatar class="md-large">
                    <img src="https://placeimg.com/64/64/people/8" alt="People">
                  </md-avatar>
                </md-list-item>

                <md-list-item>
                  <div class="md-list-text-container">
                    <span>John Doe</span>
                    <span>johndoe@email.com</span>
                  </div>
                </md-list-item>

              </md-list>
            </md-toolbar>

          <div class="phone-viewport">
              <md-list v-if="isLoggedIn">

                  <md-list-item>
                    <md-icon>send</md-icon> 
                    <span>
                        <li v-if="isLoggedIn">
                              <router-link to="/">{{ $t('Home') }}</router-link>
                          </li>
                    </span>
                  </md-list-item>

                  <md-list-item>
                    <md-icon>send</md-icon> 
                    <span>
                        <li v-if="isLoggedIn">
                              <router-link to="/projects">{{ $t('Projects') }}</router-link>
                          </li>
                    </span>
                  </md-list-item>

                  <md-list-item>
                    <md-icon>delete</md-icon> 
                    <span>
                        <li v-if="isLoggedIn">
                              <router-link to="/issues">{{ $t('Issues') }}</router-link>
                          </li>
                    </span>
                  </md-list-item>

                  <md-list-item>
                    <md-icon>error</md-icon> 
                      <span>
                          <router-link to="/tasks">{{ $t('Tasks') }}</router-link>
                    </span>
                  </md-list-item>

                  <md-list-item>
                    <md-icon>error</md-icon> 
                      <span>
                          <router-link to="/technologies">{{ $t('Technologies') }}</router-link>
                    </span>
                    <md-divider class="md-inset"></md-divider>
                  </md-list-item>                   

                  <md-list-item>
                      <span>
                          {{ $t('Choose language') }}:
                    </span>
                  </md-list-item>

                  <md-list-item>
                      <md-icon>language</md-icon> 
                      <span>
                          <a class="btn-floating red" v-on:click="setLanguage('en')">
                              {{ $t('English') }}
                          </a>
                    </span>
                  </md-list-item>

                   <md-list-item>
                    <md-icon>language</md-icon> 
                      <span>
                          <a class="btn-floating red" v-on:click="setLanguage('ua')">
                              {{ $t('Ukrainian') }}
                          </a>
                    </span>
                  </md-list-item>

              </md-list>
          </div>

        </md-sidenav>


        <md-sidenav class="md-right" ref="rightSidenav">
          <md-toolbar>
              <div class="md-toolbar-container">
                  <h3 class="md-title">Exit</h3>
              </div>
          </md-toolbar>
          <div class="phone-viewport">
              <md-list>
                  <md-list-item v-if="!isLoggedIn">
                    <md-icon>move_to_inbox</md-icon>
                    <span>
                          <router-link to="/login">{{ $t('Login') }}</router-link>
                      </span>
                  </md-list-item>

                   <md-list-item v-if="isLoggedIn">
                    <md-icon>error</md-icon> 
                      <span>
                          <a href="#" @click="logout">{{ $t('Logout') }}</a> 
                    </span>
                  </md-list-item>

              </md-list>
          </div>
      </md-sidenav>

    </div>    
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        methods: {
            ...mapActions(['logout', 'setLanguage']),
            toggleLeftSidenav() {
              this.$refs.leftSidenav.toggle();
            },
            toggleRightSidenav() {
              this.$refs.rightSidenav.toggle();
            },
            open(ref) {
              console.log('Opened: ' + ref);
            },
            close(ref) {
              console.log('Closed: ' + ref);
            }
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