<template>
   <div class="flex-wrapper">

   <div class="phone-viewport">
    <div class="title">
      All users:
    </div>
      <md-list>

        <md-list-item v-for="user in filteredUsers" :key="user.id">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/5" alt="People">
          </md-avatar>

          <span>{{user.email}}</span>

          <md-button class="md-icon-button md-list-action" @click="sendInvitation(user.id)">
            <md-icon class="md-primary">add</md-icon>
          </md-button>
          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
          
        </md-list-item>
      </md-list>
    </div>

    <div class="phone-viewport">
      <div class="title">
        Sent invitations:
      </div>
        <md-list>

          <md-list-item v-for="invitation in sentInvitations" :key="invitation.id">
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/5" alt="People">
            </md-avatar>

            <span>{{invitation.to.email}}</span>

            <md-button class="md-icon-button md-list-action" @click="deleteSentInvitation(invitation.id)">
              <md-icon class="md-warn">delete</md-icon>
            </md-button>
            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">chat_bubble</md-icon>
            </md-button>
            
          </md-list-item>
        </md-list>
      </div>

      <div class="phone-viewport">
      <div class="title">
        Friends:
      </div>
        <md-list>

          <md-list-item v-for="invitation in acceptedInvitations" :key="invitation.id">
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/5" alt="People">
            </md-avatar>

            <span>{{invitation.to.email === loggedUser.email ? invitation.from.email : invitation.to.email}}</span>

            <md-button class="md-icon-button md-list-action" @click="deleteAcceptedInvitation(invitation.id)">
              <md-icon class="md-warn">delete</md-icon>
            </md-button>
            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">chat_bubble</md-icon>
            </md-button>
            
          </md-list-item>
        </md-list>
      </div>

      <div class="phone-viewport">
      <div class="title">
        MY INVITATIONS:
      </div>
        <md-list>

          <md-list-item v-for="invitation in myInvitations" :key="invitation.id">
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/5" alt="People">
            </md-avatar>

            <span>{{invitation.from.email}}</span>

            <md-button class="md-icon-button md-list-action" @click="acceptInvitation(invitation.id)">
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
      ...mapGetters(['users', 'loggedUser']),
      ...mapGetters('friend', ['sentInvitations', 'acceptedInvitations', 'myInvitations']),
      filteredUsers() {
         return this.users;
      }
    },
    methods: {
        ...mapActions(['fetchUsers']),
        ...mapActions('friend', [
          'sendInvitation', 'fetchSentInvitations', 'deleteSentInvitation', 
          'deleteAcceptedInvitation', 'fetchMyInvitations', 'acceptInvitation', 
          'fetchAcceptedInvitations'
        ]),
    },
    beforeMount() {
      this.fetchUsers();
      this.fetchSentInvitations();
      this.fetchMyInvitations();
      this.fetchAcceptedInvitations();
    }
  }
</script>