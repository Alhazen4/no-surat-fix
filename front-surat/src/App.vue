<template>
    <router-view/>
</template>

<script>
    export default {
        name: 'app',
        created() {
            if (process.env.NODE_ENV === 'production') {
                document.title = "Aplikasi Penomoran Surat"
            } else {
                document.title = "App Development"
            }
        }
    }
</script>