<template>
    <div class="flex-wrapper" v-if="isLoggedIn">
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
</template>

<script>
    import { mapGetters } from 'vuex'
    import LineChart from './LineChart.vue'
    
    export default {        
        computed: {
            ...mapGetters(['isLoggedIn']), 
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
        },
        components: {
        	LineChart
        },
        beforeMount() {
            if(this.isLoggedIn) {
                this.$store.dispatch('technology/fetchTechnologies');
                this.$store.dispatch('project/fetchProjects');
                this.$store.dispatch('issue/fetchIssues');
            }
        }
    }
</script>