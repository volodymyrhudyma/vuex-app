<template>
    <div v-if="isPending" class="loader">
        <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

	export default {
        computed: {
            ...mapGetters(['isPending'])
        }
	}
</script>

<style lang="scss">
    .loader {
        text-align: center;
    }
</style>