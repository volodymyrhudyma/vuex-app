<template>
   <div class="flex-wrapper">

      <div class="issues">
         <list :hideAddBtn="true"></list>
      </div>

      <issue-details :project="project" :issue="issue" v-if="!isPending"></issue-details>

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
            ...mapGetters('issue', ['issue', 'isIssuePending', 'isLatestIssueFetching']),
            isPending() {
              return this.isIssuePending || this.isProjectPending || this.isLatestIssueFetching;
            }
        },
        methods: {
            ...mapActions('project', ['fetchById']),            
            ...mapActions('issue', ['fetchLatestIssue']),            
        },
        beforeMount() {
            let id = this.$route.params.id;
            this.fetchById(id);
            this.fetchLatestIssue();
        },
        components: {
          List,
          IssueDetails,
          Members
        }
    }
</script>