<template>
    <div :id="pageName">
        <div class="heading">
            <navbar></navbar>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Navbar from './navigation/Navbar.vue'

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
        },
        components: {
            Navbar
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

    .md-spinner {
        display: block;
        margin: auto;
    }

    .content {
        height: 100vh;

        .centered {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
        }

        .flex-wrapper {
            display: flex;
            height: 100%;
        }

        .wrapper-loader {
            display: flex;
            height: 100%;
        }
    }

    #projects {
        .content {
            .flex-wrapper {

                .add-section {
                    width: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 1px solid rgba(0, 0, 0, 0.12);
                }

                .list-section {
                    width: calc(100% - 100px);
                    padding-left: 10px;
                    padding-top: 10px;

                    .md-bottom-bar {
                        box-shadow: none;
                    }

                    .list {
                        height: 100%;
                    }
                }
            }
        }
    }

    #login {
        .content {
            .centered {
                .form-container {
                    display: inline-block; 
                    padding: 30px 70px; 
                    border: 1px solid #EEE;
                    width: 500px;
                }
            }
        }            
    }
    
    
    
   
</style>