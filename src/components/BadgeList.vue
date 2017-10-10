<template>
	<div class="flex-wrapper">
		
		<badge-menu></badge-menu>

	    <div class="badge-list">

			<div class="wrapper-loader" v-if="isBadgesPending">
	            <md-spinner :md-size="60" md-indeterminate class="md-primary"></md-spinner>
	        </div>

	    	<div class="heading" v-if="!isBadgesPending">
	    		Count: {{allBadges.length}}
	    	</div>	    	
	
			<div class="cards" v-if="!isBadgesPending">
		    	<md-card md-with-hover v-for="badge in allBadges" :key="badge.name">
				  <md-card-media>
				    <img src="assets/card-image-1.jpg" alt="People">
				    <md-ink-ripple></md-ink-ripple>
				  </md-card-media>
				  <md-card-actions>
				    <md-button class="md-icon-button">
				      <md-icon>favorite</md-icon>
				    </md-button>

				    <md-button class="md-icon-button">
				      <md-icon>bookmark</md-icon>
				    </md-button>

				    <md-button class="md-icon-button">
				      <md-icon>share</md-icon>
				    </md-button>
				  </md-card-actions>
				</md-card>
			</div>
			
	    </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapGetters, mapActions } = createNamespacedHelpers('badge')
    import BadgeMenu from './badge/Menu.vue'

    export default {
        computed: {
            ...mapGetters(['allBadges', 'allTypes', 'isBadgesPending']),
        },
        methods: {
            ...mapActions(['fetchBadges']),
        },
        beforeMount() {
            this.fetchBadges();
        },
        components: {
        	BadgeMenu
        }
    }
</script>
