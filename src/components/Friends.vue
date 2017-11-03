<template>
   <div class="flex-wrapper">
    <div class="phone-viewport">
      <md-list>

        <md-list-item v-for="user in users" :key="user.id">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/5" alt="People">
          </md-avatar>

          <span>{{user.name}} {{user.surname}}</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">add</md-icon>
          </md-button>
          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
          
        </md-list-item>
      </md-list>
    </div>      
  </div>
      
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['users']),
    },
    methods: {
        ...mapActions(['fetchUsers']),            
    },
    beforeMount() {
      this.fetchUsers();
    }
  }
</script>