<template>
  <div class="members">
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
</template>

<script>
    export default {
        props: ['project']
    }
</script>