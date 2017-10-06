<template>
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

          <md-spinner :md-size="60" md-indeterminate class="md-primary" v-if="isPending"></md-spinner>
        </form>
      </div>

    </div>
</template>

<script>
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
  computed: {
      ...mapGetters(['isPending'])
  }
}
</script>

<style lang="scss">    
    
</style>