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

                  <md-list-item @click="onLeftMenuItemClick()">
                    <md-icon>home</md-icon> 
                    <span>
                        <li v-if="isLoggedIn">
                              {{ $t('Home') }}
                          </li>
                    </span>
                  </md-list-item>

                  <md-list-item @click="onLeftMenuItemClick('projects')">
                    <md-icon>description</md-icon> 
                    <span>
                        <li v-if="isLoggedIn">
                              {{ $t('Projects') }}
                          </li>
                    </span>
                  </md-list-item>

                  <md-list-item @click="onLeftMenuItemClick('issues')">
                    <md-icon>gesture</md-icon> 
                    <span>
                        <li v-if="isLoggedIn">
                              {{ $t('Issues') }}
                          </li>
                    </span>
                  </md-list-item>

                  <md-list-item @click="onLeftMenuItemClick('tasks')">
                    <md-icon>list</md-icon> 
                      <span>
                          {{ $t('Tasks') }}
                    </span>
                  </md-list-item>

                  <md-list-item @click="onLeftMenuItemClick('technologies')">
                    <md-icon>http</md-icon> 
                      <span>
                          {{ $t('Technologies') }}
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
                  <md-list-item v-if="!isLoggedIn" @click="onRightMenuItemClick('login')">
                    <md-icon>move_to_inbox</md-icon>
                    <span>
                          {{ $t('Login') }}
                      </span>
                  </md-list-item>

                   <md-list-item v-if="isLoggedIn" @click="onLogoutClick()">
                    <md-icon>error</md-icon> 
                      <span>
                          {{ $t('Logout') }}
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
            onLeftMenuItemClick(route = '') {
                this.toggleLeftSidenav();
                this.$router.push("/" + route);
            },
            onRightMenuItemClick(route) {
                this.toggleRightSidenav();
                this.$router.push("/" + route);
            },
            onLogoutClick() {
                this.toggleRightSidenav();
                this.logout();
            },
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
            },
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