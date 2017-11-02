<template>
    <div class="flex-wrapper" v-if="isLoggedIn">
        <div class="charts-container">
            <div class="chart" v-if="!isPending">
                <div class="title">
                    <span class="md-display-1">Technologies</span>
                </div>
               <line-chart v-bind:stats="technologyStats" v-bind:labels="technologyLabels" v-bind:availableColors="availableColors"></line-chart>
            </div>

            <div class="chart" v-if="!isPending">
                <div class="title">
                    <span class="md-display-1">Projects</span>
                </div>
               <line-chart v-bind:stats="projectStats" v-bind:labels="projectLabels" v-bind:availableColors="availableColors"></line-chart>
            </div>

            <div class="chart" v-if="!isPending">
                <div class="title">
                    <span class="md-display-1">Issues</span>
                </div>
               <line-chart v-bind:stats="issueStats" v-bind:labels="issueLabels" v-bind:availableColors="availableColors"></line-chart>
            </div>

            <div class="wrapper-loader" v-if="isPending">
               <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
            </div>
        </div>

        <div class="teams">
            <div class="heading">
                Teams:
            </div>
            <md-list class="custom-list md-triple-line" v-if="!isTeamsPending && filteredTeams.length">
               <md-list-item v-for="(team, key) in filteredTeams" :key="team.name" @click="onTeamClick(team.id)">

                   <md-avatar class="avatar">
                       {{++key}}
                   </md-avatar>

                   <div class="md-list-text-container">
                       <span>{{team.name}}</span>
                   </div>

                   <md-button class="md-icon-button md-list-action" @click="deleteTeam(team.id)">
                      <md-icon class="md-warn">delete</md-icon>
                    </md-button>

                   <md-divider class="md-inset"></md-divider>
               </md-list-item>
           </md-list>
            <div class="add">
                <md-button class="md-icon-button md-raised md-primary" @click="openDialog('addTeam')">
                   <md-icon>add</md-icon>
               </md-button>
            </div>

            <md-dialog md-open-from="#fab" md-close-to="#fab" ref="addTeam" class="team-dialog">
               <md-dialog-title>{{ $t('Create new team') }}</md-dialog-title>

               <md-dialog-content>
                   <form>
                       <md-input-container>
                           <label>{{ $t('Name') }}</label>
                           <md-textarea v-model="newTeam.name"></md-textarea>
                       </md-input-container>
                       <md-input-container v-if="!isUsersFetching">
                           <v-select multiple v-model="newTeam.members" :options="formatUsers()" :placeholder="'Members'"></v-select>
                       </md-input-container>
                       <md-input-container v-if="!isProjectsPending">
                           <v-select multiple v-model="newTeam.projects" :options="formatProjects()" :placeholder="'Projects'"></v-select>
                       </md-input-container>
                   </form>
               </md-dialog-content>

               <md-dialog-actions>
                   <md-button class="md-primary" @click="closeDialog('addTeam')">{{ $t('Cancel') }}</md-button>
                   <md-button class="md-primary" @click="saveTeam()">{{ $t('Create') }}</md-button>
               </md-dialog-actions>
           </md-dialog>


        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import LineChart from './LineChart.vue'
    import vSelect from 'vue-select'
    
    export default {
        data () {
            return {
                newTeam: {
                    name: '',
                    slug: '',
                    members: [],
                    projects: []
                },
            }
        },
        computed: {
            ...mapGetters(['isLoggedIn', 'loggedUser', 'isUsersFetching', 'users']),
            ...mapGetters('team', ['allTeams']),
            ...mapGetters('project', ['allProjects']),
            technologyStats() {
                return this.$store.getters['technology/technologyStats'];
            },
            projectStats() {
                return this.$store.getters['project/projectStats'];
            },
            issueStats() {
                return this.$store.getters['issue/issueStats'];
            },
            technologyLabels() {
                return this.$store.getters['technology/technologyLabels'];
            },
            projectLabels() {
                return this.$store.getters['project/projectLabels'];
            },
            issueLabels() {
                return this.$store.getters['issue/issueLabels'];
            },
            isTechnologiesPending() {
                return this.$store.getters['technology/isTechnologiesPending'];
            },
            isProjectsPending() {
                return this.$store.getters['project/isProjectsPending'];
            },
            isIssuesPending() {
                return this.$store.getters['issue/isIssuesPending'];
            },
            isPending() {
                return this.isProjectsPending || this.isTechnologiesPending || this.isIssuesPending;
            },
            availableColors() {
                return this.$store.getters['technology/availableColors'];
            },
            isTeamsPending() {
                return this.$store.getters['team/isTeamsPending'];
            },
            filteredTeams() {
                return this.allTeams;
            },
        },
        methods: {
            ...mapActions(['fetchUsers']),
            ...mapActions('team', ['storeTeam', 'deleteTeam']),
            openDialog(ref) {
                this.$refs[ref].open();
            },
            closeDialog(ref) {
                this.$refs[ref].close();
            },
            saveTeam() {
                this.slugifyNewTeam();
                this.setTeamData();
                this.storeTeam(this.newTeam);
                this.closeDialog('addTeam');
                this.resetNewTeamData();
            },
            slugifyNewTeam() {
                this.newTeam.slug = this.slugify(this.newTeam.name);
            },
            slugify(string) {
                return string
                    .toString()
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                    .replace(/\-\-+/g, "-")
                    .replace(/^-+/, "")
                    .replace(/-+$/, "");
            },
            setTeamData() {
                this.newTeam.userId = this.loggedUser.id;
                this.newTeam.members = this.newTeam.members.map(member => {
                    return member.value;
                });
                this.newTeam.projects = this.newTeam.projects.map(project => {
                    return project.value;
                });
            },
            formatUsers() {
              return this.users.map(user => {
                return {
                  label: user.name,
                  value: user.id
                };
              });
            },
            formatProjects() {
              return this.allProjects.map(project => {
                return {
                  label: project.name,
                  value: project.id
                };
              });
            },
            resetNewTeamData() {
                this.newTeam = {
                    name: '',
                    slug: '',
                    members: []
                };
            },
        },
        components: {
        	LineChart,
            vSelect
        },
        beforeMount() {
            if(this.isLoggedIn) {
                this.$store.dispatch('technology/fetchTechnologies');
                this.$store.dispatch('project/fetchProjects');
                this.$store.dispatch('issue/fetchIssues');
                this.$store.dispatch('team/fetchTeams');
                this.fetchUsers();
            }
        }
    }
</script>