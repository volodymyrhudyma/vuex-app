<template>
   <div class="flex-wrapper">
      <div class="avatar" v-if="!isPending">
         <div class="image">
            {{loggedUser.avatar}}
         </div>
         <div class="full-name">
            {{fullName}}
         </div>
      </div>
      <div class="overview">
         <md-tabs md-centered>
            <md-tab md-label="Overview" md-icon="ondemand_video">
               <div class="data" v-if="!isPending">
                  <div class="item">
                     Name: {{loggedUser.name}}
                  </div>
                  <div class="item">
                     Email: {{loggedUser.email}}
                  </div>
               </div>
               <div class="wrapper-loader" v-if="isPending">
                  <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
               </div>
            </md-tab>

            <md-tab md-label="Following" md-icon="music_note">
               <div class="empty" v-if="!isPending">
                  You aren't following nobody
               </div>
            </md-tab>

            <md-tab md-label="Followers" md-icon="books">
               <div class="empty" v-if="!isPending">
                  You don't have any followers yet
               </div>
            </md-tab>
         </md-tabs>

      </div>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters(['loggedUser', 'isPending']),
            fullName() {
                return this.loggedUser.name + ' ' + this.loggedUser.surname;
            },
        },
    }
</script>