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

    .issue-dialog {
        .dropdown {
            &.v-select {
                width: 100%;

                .dropdown-toggle {
                    border: none;
                    border-radius: 0;
                }
            }
        }
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
            justify-content: space-between;
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

    #projects, #issues, #technologies, #project {
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
                        height: 210px;

                        .status {
                            padding-left: 16px;
                        }
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
                        height: calc(100% - 210px);
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

                                .md-chip {
                                    padding: 0;
                                    height: auto;

                                    &:not(:last-child) {
                                        margin-right: 3px;
                                    }

                                    .tag {
                                        padding: 3px 10px;
                                        cursor: pointer;
                                    }
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

    #project {
        .flex-wrapper {
            .issues {
                .flex-wrapper {
                    height: 100%;

                    .list-section {
                        width: 100%;
                    }
                }                    
            }

            .general-info {
                width: 100%;
                padding: 20px;

                .heading {
                    height: 40px;
                    padding-bottom: 20px;
                    font-size: 2em;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
                }

                .issue {
                    padding-top: 20px;
                    height: calc(100% - 20px);
                    overflow-y: auto;

                    .empty {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .section {
                        font-weight: bold;
                        margin-bottom: 5px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
                    }

                    .head {
                        display: flex;

                        .avatar {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .info {
                            margin: 0 15px;
                        }

                        .workers {
                            margin-left: auto;
                            margin-right: 10px;
                            text-align: right;
                            position: relative;

                            .change {
                                display: none;
                                position: absolute;
                                right: -10px;
                                top: -15px;

                                i {
                                    width: 15px;
                                }
                            }

                            .assignee {
                                display: flex;
                                padding-right: 30px;

                                &:hover {
                                    .change {
                                        display: inline;
                                    }
                                }

                                .wrapper-loader {
                                    position: absolute;
                                    right: 0;
                                    top: -5px;
                                    width: auto;
                                    height: auto;
                                }

                                .name {
                                    margin-left: 5px;
                                }
                            }

                            .reporter {
                                display: flex;

                                .name {
                                    margin-left: 5px;
                                }
                            }
                        }
                    }

                    .manager {
                        display: flex;
                        margin: 10px 0;

                        .actions {
                            display: flex;
                            margin-right: 15px;

                            .item {
                                &:first-child {
                                    button {
                                        margin-left: 0;
                                    }
                                }
                            }
                        }

                        .status {
                            display: flex;

                            .item {
                                button {
                                    margin-left: 0;
                                    margin-right: 0;

                                    &.to-do {
                                        &.active {
                                            background: #3f51b5;
                                            color: #fff;
                                        }
                                    }

                                    &.in-progress {
                                        &.active {
                                            background: orange;
                                            color: #fff;
                                        }
                                    }

                                    &.done {
                                        &.active {
                                            background: green;
                                            color: #fff;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .details {
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 15px;

                        div {
                            span {
                                &:first-child {
                                    display: inline-block;
                                    width: 105px;
                                }
                            }
                        }
                    }

                    .description {
                        margin-bottom: 15px;
                    }

                    .attachments {
                        margin-bottom: 15px;
                    }

                    .activity {
                        margin-bottom: 15px;

                        .comments-container {
                            .add-comment {
                                margin-top: 10px;
                            }
                        }

                       
                    }
                }
            }

            .members {
                padding: 20px 0;
            }
        }
    }
   
</style>