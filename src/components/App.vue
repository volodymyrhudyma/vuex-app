<template>
    <div :id="pageName">
        <router-view></router-view>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                pageName: ""
            }
		},
        updated() {
            this.pageName = this.$route.path.toLowerCase().split('/')[1];
        },
        mounted() {
            this.pageName = this.$route.path.toLowerCase().split('/')[1];
        }
	}
</script>

<style lang="scss">
    body {
        overflow: hidden;
    }
    p {
        margin: 0;
    }
    .content {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>