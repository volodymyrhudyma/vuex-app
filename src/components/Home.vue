<template>
    
    <div class="flex-wrapper" v-if="isLoggedIn">
        <div class="chart" v-if="!isTechnologiesPending">
            <div class="title">
                <span class="md-display-1">Technologies used</span>
            </div>
           <line-chart v-bind:technologyStats="technologyStats" v-bind:technologyLabels="technologyLabels" v-bind:availableColors="availableColors"></line-chart>
        </div>

        <div class="chart" v-if="!isTechnologiesPending">
            <div class="title">
                <span class="md-display-1">Technologies used</span>
            </div>
           <line-chart v-bind:technologyStats="technologyStats" v-bind:technologyLabels="technologyLabels" v-bind:availableColors="availableColors"></line-chart>
        </div>

        <div class="chart" v-if="!isTechnologiesPending">
            <div class="title">
                <span class="md-display-1">Technologies used</span>
            </div>
           <line-chart v-bind:technologyStats="technologyStats" v-bind:technologyLabels="technologyLabels" v-bind:availableColors="availableColors"></line-chart>
        </div>

        <div class="wrapper-loader" v-if="isTechnologiesPending">
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
            technologyLabels() {
                return this.$store.getters['technology/technologyLabels'];
            },
            isTechnologiesPending() {
                return this.$store.getters['technology/isTechnologiesPending'];
            },
            availableColors() {
                return this.$store.getters['technology/availableColors'];
            },
        },
        components: {
        	LineChart
        },
        beforeMount() {
            this.$store.dispatch('technology/fetchTechnologies');
        }
    }
</script>