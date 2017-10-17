<template>
    
    <div class="flex-wrapper" v-if="isLoggedIn">
        <div>Callback</div>
    </div>
    
</template>

<script>
    import { setIdToken, setAccessToken } from '../store/modules/auth';

    export default {
      mounted() {
        this.$nextTick(() => {
          setAccessToken();
          setIdToken();
          console.log('logged in!')
        });
      },
    };
</script>