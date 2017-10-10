<template>
   <div class="flex-wrapper">
      <div class="avatar" v-if="!isProfileFetching">
         <div class="image">
            <img src="#" alt="Avatar" />
         </div>
         <div class="full-name">
            {{fullName}}
         </div>
      </div>
      <div class="overview">
         <md-tabs md-centered>
            <md-tab md-label="Overview" md-icon="ondemand_video">
               <div class="data" v-if="!isProfileFetching">
                  <div class="item">
                     Name: {{fullName}}
                  </div>
                  <div class="item">
                     Email: {{profile.email}}
                  </div>
                  <div class="item">
                     Bio: {{profile.bio}}
                  </div>
                  <div class="location">
                     City: {{profile.city}}
                  </div>
               </div>
               <div class="wrapper-loader" v-if="isProfileFetching">
                  <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
               </div>
            </md-tab>

            <md-tab md-label="Following" md-icon="music_note">
               <div class="empty" v-if="!isProfileFetching && !profile.following.length">
                  You aren't following nobody
               </div>
            </md-tab>

            <md-tab md-label="Followers" md-icon="books">
               <div class="followers" v-if="!isProfileFetching">
                  <div class="item" v-for="follower in filteredFollowers">
                     <img src="../assets/images/avatar.png" :alt="follower.name" />
                  </div>
               </div>
               <div class="empty" v-if="!isProfileFetching && !profile.followers.length">
                  You don't have any followers yet
               </div>
            </md-tab>
         </md-tabs>

      </div>
   </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters } = createNamespacedHelpers('profile');

    export default {
        computed: {
            ...mapGetters(['profile', 'isProfileFetching']),
            fullName() {
                return this.profile.name + ' ' + this.profile.surname;
            },
            filteredFollowers() {
                return this.profile.followers;
            }
        },
    }
</script>