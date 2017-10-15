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
            <div class="workers">
                <div class="assignee">
                    <span class="title">
                        Assignee:
                    </span>
                    <span class="name">
                        {{issue.assignee.name}}
                    </span>
                    <span class="change">

                        <md-select name="assignee" id="assignee" v-on:change="assigneeChanged">
                          <md-button class="md-icon-button" md-menu-trigger slot="icon">
                            <md-icon>mode_edit</md-icon>
                          </md-button>
                          <md-option value="1">Pam Beesly</md-option>
                          <md-option value="2">Angela Martin</md-option>
                          <md-option value="3">Kelly Kapoor</md-option>
                          <md-option value="4">Ryan Howard</md-option>
                          <md-option value="5">Kevin Malone</md-option>
                          <md-option value="6">Creed Bratton</md-option>
                          <md-option value="7">Oscar Nunez</md-option>
                          <md-option value="8">Toby Flenderson</md-option>
                          <md-option value="9">Stanley Hudson</md-option>
                          <md-option value="10">Meredith Palmer</md-option>
                          <md-option value="11">Phyllis Lapin-Vance</md-option>
                        </md-select>
                    </span>
                </div>
                <div class="reporter">
                    <span class="title">
                        Reporter:
                    </span>
                    <span class="name">
                        {{issue.reporter.name}}
                    </span>
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
      .
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
          ...mapActions('issue', ['changeIssueStatus', 'changeIssueAssignee']),
          changeStatus(status) {
            this.changeIssueStatus(status);
          },
          assigneeChanged(id) {
              this.changeIssueAssignee(id);
          }
        }
    }
</script>