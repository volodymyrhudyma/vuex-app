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
            this.pageName = this.splitUrl() ? this.splitUrl() : 'home';
        },
        mounted() {
            this.pageName = this.splitUrl() ? this.splitUrl() : 'home';
        },
        beforeMount() {
		    this.$store.dispatch('profile/fetchProfile');
        },
        methods: {
            splitUrl() {
                return this.$route.path.toLowerCase().split('/')[1];
            }
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

    .heading {
        .md-sidenav-content {
            .md-avatar {
                margin: 15px auto!important;
                cursor: pointer;
            }

            .md-list-text-container {
                text-align: center;

                span {
                    margin-bottom: 5px;
                    color: #fff;

                    &:last-child {
                        margin-bottom: 10px;
                    }
                }
            }
        }
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
            justify-content: space-around;
        }

        .wrapper-loader {
            display: flex;
            height: 100%;
            width: 100%;
        }        
    }

    .progress-bar, .perfect-progress-bar {
        width: 200px;
        height: 25px;
        background: transparent;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 5px;
        position: relative;

        .percentage {
            padding: 0 5px;
            position: absolute;
            top: 1px;
            right: 0;
        }

        .fill-wrapper {
            width: 15%;
            height: 100%;
            position: absolute;
            background: rgba(0, 0, 0, .12);
        }
    }

    .see-info-dialog {

        .md-dialog-content {
            padding-top: 24px;
        }
        
        div {
            margin-bottom: 5px;
        }

        span.value {
            font-weight: bold;
        }

        .tip {
            font-weight: bold;

            &.ok {
                color: #7CB342;
            }

            &.lack {
                color: #d32f2f;
            }
        }
    }

    #projects, #issues, #technologies {
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

                        .empty-list {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 100%;

                            .filter-name {
                                font-weight: bold;
                                margin: 0 10px;
                                color: #3f51b5;
                            }
                        }

                        .md-list {
                            padding: 0;

                            .md-list-text-container {
                                position: relative;
                            }
                            
                            .md-list-item {

                                .avatar {
                                    background: #3f51b5;
                                    color: white;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }
                            }
                        }

                        .progress-bar, .perfect-progress-bar {
                            position: absolute;
                            right: 140px;
                        }

                        .progress-bar {
                            bottom: 15px;
                        }

                        .perfect-progress-bar {
                            top: 15px;
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

    #home {
        .content {
            .flex-wrapper {
                .chart {
                    .title {
                        text-align: center;
                        margin: 20px 0;
                    }
                }
            }   
        }
    }

    #badges {
        .content {
            .flex-wrapper {
                .badge-menu {
                    width: 250px;

                    .md-list {
                        border: 1px solid rgba(0, 0, 0, 0.2); 
                    }
                }
                .badge-list {
                    width: calc(100% - 250px);
                    padding: 25px;

                    .heading {
                        padding-bottom: 25px;
                    }

                    .cards {
                        display: flex;
                        flex-wrap: wrap;

                        .md-card {
                            width: 20%;
                            display: flex;
                            justify-content: space-between;
                            height: 250px;
                        }
        
                    }
                }
            }
        }
    }

    #profile {
        .flex-wrapper {
            .avatar {
                width: 300px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .overview {
                width: 100%;

                .md-tabs {
                    height: 100%;

                    .md-tabs-content {
                        height: 100%!important;

                        .md-tab {
                            height: 100%;

                            .empty {
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }

                            .followers {
                                display: flex;
                                flex-wrap: wrap;

                                .item {
                                    width: 20%;
                                    height: 50px;
                                    text-align: center;

                                    img {
                                        border-radius: 50%;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
   
</style>