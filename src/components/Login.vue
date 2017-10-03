<template>
    <div class="value">
        <div class="heading">
            <navbar></navbar>
        </div>
        <div class="content">
           <div class="centered">
                <div class="form-container z-depth-1 grey lighten-4 row">
                <h5 class="indigo-text">Please, login into your account</h5>
                <form class="col s12" method="post" @submit.prevent="login({ email, password })">
                    <div class='row'>
                      <div class='col s12'>
                      </div>
                    </div>
                    <div class='row'>
                      <div class='input-field col s12'>
                        <input class='validate' type='email' name='email' id='email' v-model="email" />
                        <label for='email'>Enter your email</label>
                      </div>
                    </div>
                    <div class='row'>
                      <div class='input-field col s12'>
                        <input class='validate' type='password' name='password' id='password' v-model="password" />
                        <label for='password'>Enter your password</label>
                      </div>
                    </div>
                    <div class='row'>
                        <button type='submit' name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Login</button>
                    </div>
                </form>
                <loader v-if="isPending"></loader>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar.vue'
import Loader from './Loader.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push("/home")
      });
    }
  },
  components: {
    Navbar,
    Loader
  },
  computed: {
      ...mapGetters(['isPending'])
  }
}
</script>

<style lang="scss">    
    .form-container {
        display: inline-block; 
        padding: 30px 70px; 
        border: 1px solid #EEE;
    }
</style>