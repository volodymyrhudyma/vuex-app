<template>
   <div class="flex-wrapper">

      <div class="actions">
         <div class="item">
            Activity
         </div>
         <div class="item">
            Issues
         </div>
         <div class="members">
            Members
         </div>
      </div>

      <div class="wrapper-loader" v-if="isProjectPending">
         <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
      </div>

      <div class="details" v-if="!isProjectPending">

         <div class="heading">
            Activity
         </div>

         <div class="item">
            {{project.name}}
            {{project.description}}
            {{project.avatar}}
            {{project.tags}}
            {{project.progress}}
         </div>
      </div>
      <div class="members" v-if="!isProjectPending">
         <div class="heading">
            Members
         </div>
         <div class="lead">
            Lead: Volodymyr Hudyma
         </div>
         <div class="most-active">
            <div class="item">
               One
            </div>
            <div class="item">
               Two
            </div>
         </div>
      </div>
   </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters, mapActions } = createNamespacedHelpers('project')

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