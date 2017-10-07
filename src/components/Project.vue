<template>
   <div class="flex-wrapper">
       <div class="wrapper-loader" v-if="isProjectPending">
           <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
       </div>
       <span v-if="!isProjectPending">{{project.name}}</span>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters(['project', 'isProjectPending']),
        },
        methods: {
            ...mapActions(['fetchBySlug']),
        },
        beforeMount() {
            let slug = this.$route.params.slug;
            this.fetchBySlug(slug);
        }
    }
</script>
