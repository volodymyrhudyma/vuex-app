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
            height: calc(100% - 64px);
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
                    height: 100%;

                    .search {
                        padding-left: 16px;                        
                    }

                    .filter-panel {
                        padding: 15px 0;
                        height: 140px;
                    }

                    .md-bottom-bar {
                        box-shadow: none;

                        .md-bottom-bar-item {
                            &.md-active {
                                color: #3f51b5;
                            }
                        }
                    }

                    .list {
                        height: calc(100% - 140px);
                        overflow-y: auto;

                        .md-list {
                            padding: 0;

                            .md-list-text-container {
                                position: relative;
                            }
                            
                            .md-list-item {
                                &:hover {
                                    background: rgba(0, 0, 0, 0.12);
                                    cursor: pointer;
                                }
                            }
                        }

                        .progress-bar {
                            width: 200px;
                            height: 25px;
                            background: transparent;
                            border: 1px solid rgba(0, 0, 0, 0.12);
                            border-radius: 5px;
                            position: absolute;
                            right: 0;
                            top: calc(50% - 12.5px);

                            .percentage {
                                padding: 0 5px;
                                position: absolute;
                                top: 1px;
                            }

                            .fill-wrapper {
                                width: 15%;
                                height: 100%;
                                position: absolute;
                                background: #3f51b5;
                            }
                        }
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