<template>
    <div class="value">
        <div class="heading">
            <navbar></navbar>
        </div>
        <div class="content">
           <div class="centered">
  
                <div class="form-container">
                  <form novalidate @submit.stop.prevent="login({ email, password })">
                    <md-input-container>
                      <label>Email</label>
                      <md-input type="email"></md-input>
                    </md-input-container>

                    <md-input-container md-has-password>
                      <label>Password</label>
                      <md-input type="password"></md-input>
                    </md-input-container>

                    <md-button type="submit" class="md-raised md-primary">Submit</md-button>

                    <md-spinner :md-size="60" md-indeterminate class="md-warn" v-if="isPending"></md-spinner>
                  </form>
                </div>

              </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './navigation/Navbar.vue'
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
        this.$router.push("/")
      });
    }
  },
  components: {
    Navbar,
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
        width: 500px;
    }

    .md-spinner {
      display: block;
      margin: auto;
    }
</style>