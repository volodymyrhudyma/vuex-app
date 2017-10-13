<template>
   <div class="flex-wrapper">

      <div class="issues">
         <list :hideAddBtn="true"></list>
      </div>

      <div class="wrapper-loader" v-if="isProjectPending">
         <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
      </div>

      <div class="details" v-if="!isProjectPending">
        <div class="heading">
            Open issues
        </div>
        <div class="issue">
            <div class="head">
                <div class="avatar">
                    A
                </div>
                <div class="info">
                    <div class="breadcrumb">
                        {{project.name}} / PRO-2354
                    </div>
                    <div class="title">
                        To do something
                    </div>
                </div>
           </div>
           <div class="manager">
                <div class="actions">
                    <div class="item">
                        <md-button class="md-raised">Edit</md-button>
                   </div>                   
                </div>
                <div class="status">
                    <div class="item">
                        <md-button class="md-raised to-do active">To Do</md-button>
                   </div>
                   <div class="item">
                       <md-button class="md-raised in-progress">In Progress</md-button>
                   </div>
                   <div class="item">
                       <md-button class="md-raised done">Done</md-button>
                   </div>
                </div>
           </div>
           <div class="description">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
           </div>
         </div>
      </div>

      <div class="members" v-if="!isProjectPending">
         <div class="lead" v-if="project.leads.length">
            <div class="heading">
                Lead
            </div>
            <div class="phone-viewport">
                 <md-list>
                    <md-list-item v-for="lead in project.leads">
                      <md-avatar>
                        <img src="https://placeimg.com/40/40/people/5" alt="People">
                      </md-avatar>
                      <span>{{lead.name}}</span>
                    </md-list-item>
                </md-list>
            </div>
         </div>
         <div class="most-active" v-if="project.members.length">
            <div class="heading">
                Members
            </div>
            <div class="phone-viewport">
                 <md-list>
                    <md-list-item v-for="member in project.members">
                      <md-avatar>
                        <img src="https://placeimg.com/40/40/people/5" alt="People">
                      </md-avatar>
                      <span>{{member.name}}</span>
                    </md-list-item>
                </md-list>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import List from './issue/List.vue'
    const { mapGetters, mapActions } = createNamespacedHelpers('project')

    export default {
        computed: {
            ...mapGetters(['project', 'isProjectPending']),
        },
        methods: {
            ...mapActions(['fetchById']),
        },
        beforeMount() {
            let id = this.$route.params.id;
            this.fetchById(id);
        },
        components: {
          List
        }
    }
</script>