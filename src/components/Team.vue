<template>
   <div class="flex-wrapper">
   	<div class="details" v-if="!isTeamPending">
	   	<div class="item">
	   		<div class="heading">
	   			Name:
	   		</div>
	   		<div class="value">
	   			{{team.name}}
	   		</div>
	   	</div>
	   	<div class="item">
	   		<div class="heading">
	   			Members:
	   		</div>
	   		<div class="value link" v-for="member in team.members" @click="onMemberClick(member.id)">
	   			{{fullName(member)}}
	   		</div>
	   	</div>
	   	<div class="item">
	   		<div class="heading">
	   			Projects:
	   		</div>
	   		<div class="value link" v-for="project in team.projects" @click="onProjectClick(project.id)">
	   			{{project.name}}
	   		</div>
	   	</div>
   	</div>

   	<div class="wrapper-loader" v-if="isTeamPending">
     <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
    </div>
   </div>
      
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters('team', ['isTeamPending', 'team']),

        },
        methods: {
            ...mapActions('team', ['fetchById']),
            fullName(member) {
            	return member.name + " " + member.surname;
            },
            onMemberClick(id) {
            	console.log('member click')
            },
            onProjectClick(id) {
            	console.log('project click')
            	this.$router.push("/project/" + id);
            },
        },
        beforeMount() {
            let id = this.$route.params.id;
            this.fetchById(id);
        },
    }
</script>