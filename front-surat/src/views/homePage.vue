<template>
    <div>
        <navigation></navigation>
        <div class="body">
            <div class="wrapper">
                <div class="info wrapper">

                        <b-carousel
                        class="carousel"
                        :interval="4000"
                        fade
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
                        >
                        <b-carousel-slide>
                            <template #img>
                                <img width="1024" height="480" src="../assets/1.jpg" alt="image">
                            </template>
                        </b-carousel-slide>
                        <b-carousel-slide>
                            <template #img>
                                <img width="1024" height="480" src="../assets/2.jpg" alt="image">
                            </template>
                        </b-carousel-slide>
                        <b-carousel-slide>
                            <template #img>
                                <img width="1024" height="480" src="../assets/3.jpg" alt="image">
                            </template>
                        </b-carousel-slide>
                    </b-carousel>

                    <h2>Selamat Datang!</h2>
                    <p>
                        Serat adalah sebuah inovasi yang akan memudahkan kamu dalam melakukan pendataan dan perapihan
                        adminstrasi perkantoran atas surat yang masuk ataupun surat keluar.
                    </p>
                    <p>
                        Dengan aplikasi Serat, sebuah unit dalam perusahaan dapat dengan mudah melakukan pendataan 
                        surat masuk dengan rapih sehingga dapat melakukan <i>record</i> secara digital. 
                    </p>
                    <p>
                        Selain itu, dengan Serat, juga dapat dengan mudah melakukan <i>generate</i> nomer surat sesuai 
                        dengan Kebutuhan Surat dan Penandatangan tanpa ada lagi kesalahan takah.
                    </p>
                </div>
            </div>
        </div>
        <customFooter></customFooter>
    </div>
</template>

<script>

    import navigation from './nav.vue';
    import customFooter from './footer.vue';

    import store from '/src/store';
    import apis from './apis.js';

    export default {

        components: {
            navigation,
            customFooter
        },

        name: 'homePage',

        data() {
            return {
                sliding: null
            }
            },
        
        methods: {
            onSlideStart(slide) {
                this.sliding = true
            },
            onSlideEnd(slide) {
                this.sliding = false
            }
        }
    }
</script>

<style>

    .body {
        padding: 130px 0;
    }

    .carousel {
        position: relative;
        z-index: 2;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info {
        width: 65%;
        height: auto;
        flex-direction: column;
    }

    .info h2 {
        margin-top: 20px;
    }

    .info h5 {
        margin-bottom: 20px;
    }

    .info p {
        margin-top: 20px;
        font-size: 1.2rem;
        text-align: justify;
    }

</style>