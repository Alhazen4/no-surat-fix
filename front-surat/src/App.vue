<template>
    <router-view/>
</template>

<script>
    import store from './store/index.ts';

    export default {
        name: 'app',
        created() {
            if (process.env.NODE_ENV === 'production') {
                document.title = "Sistem Nomer Surat"
            } else {
                document.title = "Serat Development"
            }

            if (!window.navigator.onLine) {
                store.dispatch('logoutAction')
            }
        }
    }
</script>