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
                    <md-button :class="'md-raised to-do ' + [issueStatus === 'to-do' ? 'active' : '']">To Do</md-button>
               </div>
               <div class="item">
                   <md-button :class="'md-raised in-progress ' + [issueStatus === 'in-progress' ? 'active' : '']">In Progress</md-button>
               </div>
               <div class="item">
                   <md-button :class="'md-raised done ' + [issueStatus === 'done' ? 'active' : '']">Done</md-button>
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
    export default {
        props: ['project', 'issue'],
        computed: {
          issueStatus() {
            return this.issue.status;
          }
        }
    }
</script>