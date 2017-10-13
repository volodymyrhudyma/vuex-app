<template>
  <div class="details">
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
                    {{project.name}} / {{issue.id}}
                </div>
                <div class="title">
                    {{issue.name}}
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
                    <md-button :class="'md-raised to-do ' + [issueStatus === 'to-do' ? 'active' : '']" @click="changeStatus('to-do')">To Do</md-button>
               </div>
               <div class="item">
                   <md-button :class="'md-raised in-progress ' + [issueStatus === 'in-progress' ? 'active' : '']" @click="changeStatus('in-progress')">In Progress</md-button>
               </div>
               <div class="item">
                   <md-button :class="'md-raised done ' + [issueStatus === 'done' ? 'active' : '']" @click="changeStatus('done')">Done</md-button>
               </div>
            </div>
       </div>
       <div class="description">
           {{issue.description}}
       </div>
     </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

    export default {
        props: ['project', 'issue'],
        computed: {
          issueStatus() {
            return this.issue.status;
          }
        },
        methods: {
          ...mapActions('issue', ['changeIssueStatus']),
          changeStatus(status) {
            this.changeIssueStatus(status);
          }
        }
    }
</script>