<template>
   <div class="flex-wrapper">

   <div class="phone-viewport">
    <div class="title">
      All users:
    </div>
      <md-list>

        <md-list-item v-for="user in users" :key="user.id">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/5" alt="People">
          </md-avatar>

          <span>{{user.name}} {{user.surname}}</span>

          <md-button class="md-icon-button md-list-action" @click="addFriend(user.id)">
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
        Your friends:
      </div>
      <md-list>

        <md-list-item v-for="friend in acceptedInvitations" :key="friend.id">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/5" alt="People">
          </md-avatar>

          <span>{{friend.info.name}} {{friend.info.surname}}</span>

          <md-button class="md-icon-button md-list-action" @click="deleteFriend(friend.id)">
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
        Your invitations:
      </div>
      <md-list>

        <md-list-item v-for="friend in myInvitations" :key="friend.id">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/5" alt="People">
          </md-avatar>

          <span>{{friend.info.name}} {{friend.info.surname}}</span>

          <md-button class="md-icon-button md-list-action" @click="deleteFriend(friend.id)">
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
        Sent invitations:
      </div>
      <md-list>

        <md-list-item v-for="friend in sentInvitations" :key="friend.id">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/5" alt="People">
          </md-avatar>

          <span>{{friend.info.name}} {{friend.info.surname}}</span>

          <md-button class="md-icon-button md-list-action" @click="deleteFriend(friend.id)">
            <md-icon class="md-warn">delete</md-icon>
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
      ...mapGetters('friend', ['allFriends']),
      ...mapGetters(['users', 'loggedUser']),
      sentInvitations() {
        return this.allFriends.filter(friend => {
          return !friend.confirmed;
        })
      },
      acceptedInvitations() {
        return this.allFriends.filter(friend => {
          return friend.confirmed;
        })
      },
      myInvitations() {
        return this.allFriends.filter(friend => {
          return friend.info.id === this.loggedUser.id;
        });
      },
    },
    methods: {
        ...mapActions(['fetchUsers']),
        ...mapActions('friend', ['addFriend', 'fetchFriends', 'deleteFriend']),
    },
    beforeMount() {
      this.fetchUsers();
      this.fetchFriends();
    }
  }
</script>