<template>
    <div v-if="!isLoggedIn" class="unlogged">
        Home page, please log in
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    
    export default {        
        computed: {
            ...mapGetters(['isLoggedIn'])
        }
    }
</script>