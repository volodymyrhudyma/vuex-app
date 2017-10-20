<template>
   <div class="flex-wrapper">

      <div class="issues">
         <list></list>
      </div>

      <issue-details :project="project" v-if="!isPending"></issue-details>

      <div class="wrapper-loader" v-if="isPending">
         <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
      </div>    

      <members :project="project" v-if="!isProjectPending"></members>

  </div>
      
</template>

<script>
    import List from './issue/List.vue'
    import IssueDetails from './issue/Details.vue'
    import Members from './project/Members.vue'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters('project', ['project', 'isProjectPending']),
            ...mapGetters('issue', ['isIssuePending']),
            isPending() {
              return this.isIssuePending || this.isProjectPending;
            }
        },
        methods: {
            ...mapActions('project', ['fetchById']),            
        },
        beforeMount() {
            let id = this.$route.params.id;
            this.fetchById(id);
        },
        components: {
          List,
          IssueDetails,
          Members
        }
    }
</script>