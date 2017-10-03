<template>
    <div class="value">
        <div class="heading">
            <navbar></navbar>
        </div>
        <div class="content">
            <ul class="comment-list">
                <loader v-if="isFetching"></loader>
                <li v-for="comment in allComments" class="item">
                    <div class="field">
                        {{comment.id}}
                    </div>
                    <div class="field">
                        {{comment.name}}
                    </div>
                    <div class="field">
                        {{comment.email}}
                    </div>
                    <div class="field">
                        {{comment.body}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Loader from './Loader.vue'
    import Navbar from './Navbar.vue'
    
    export default {        
        computed: {
            ...mapGetters(['allComments', 'isFetching'])
        },
        methods: {
            ...mapActions(['fetchComments'])
        },
        components: {
            Loader,
            Navbar
        },
        beforeMount() {
            this.fetchComments();
        }
    }
</script>

<style lang="scss">
</style>