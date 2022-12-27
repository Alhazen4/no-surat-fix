<template>
    <router-view/>
</template>

<script>
    import store from './store/index.ts';

    export default {
        name: 'app',
        created() {
            if (process.env.NODE_ENV === 'production') {
                
                if (!window.navigator.onLine) {
                    store.dispatch('logoutAction')
                }
                document.title = "Sistem Nomer Surat"
            } else {
                document.title = "Serat Development"
            }
        }
    }
</script>