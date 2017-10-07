<template>
</template>
<script>
    import { setIdToken, setAccessToken } from '../store/modules/auth';

    export default {
        name: '',
        mounted() {
            this.$nextTick(() => {
                setAccessToken();
                setIdToken();
                window.location.href = '/';
            });
        },
    };
</script>