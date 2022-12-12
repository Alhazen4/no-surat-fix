<template>
    <div>
        <div class="nav justify-content-between">
            <p>Penomoran Surat</p>
            <ul>
                <li><a href="/homePage">Home</a></li>
                <li><a href="/suratKeluar">Surat Keluar</a></li>
                <li><a href="/suratMasuk">Surat Masuk</a></li>
                <li><a href="/daftarUser" :style="{ display }">Daftar User</a></li>
                <li>
                    <div class="dropdown">
                        <a class="dropbtn">Profil</a>
                        <div class="dropdown-content">
                            <a>User {{nama_admin}}</a>
                            <a class="logout-btn" @click="logout">Log Out</a>
                        </div>
                    </div>
                </li>   
            </ul>
        </div>
        <div class="body">
            <div class="wrapper">
                <div class="info wrapper">
                    <h2>Welcome to the Application</h2>
                    <img src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" srcset="">

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. In quos dolorum rerum molestias doloribus at incidunt dignissimos alias dolorem nihil necessitatibus odio, minus praesentium nesciunt consequuntur! Ratione nobis voluptates autem? Nemo asperiores voluptate, nobis enim, alias ab, illum impedit rerum magni veritatis excepturi omnis minima amet deleniti dolore dignissimos distinctio adipisci explicabo eligendi! Quam modi hic distinctio debitis quis recusandae, expedita totam quidem officia veniam ullam sapiente? Quod, debitis ullam.
                        <br>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nihil commodi quam rerum provident necessitatibus libero quis quod similique quidem!
                    </p>
                    <b-button href="/tambahSurat">Start Use</b-button>
                </div>
            </div>
        </div>
        <footer>
            by pass
        </footer>
    </div>
</template>

<script>

    import store from '/src/store';
    import apis from './apis.js';

    export default {
        async mounted() {

            if (store.state.role === 'super_admin') {
                this.display = 'block'
                } else {
                this.display = 'none'
                }

                
            try {
                await apis.get(`/user/${store.state.id}`)
                .then((response) => {
                    this.nama_admin = response.data.nama
                });
            } catch (error) {
                console.log(error);
            }
        },
        
        name: 'homePage',
        data() {
            return {
                nama_admin:'',
                display: 'none'
            }
        },

        methods: {
            logout() {
                store.dispatch('logoutAction')
            }
        }

    }
</script>

<style>

    html {
        height: 100%;
    }

    body {
        height: 100%;
    }

    .nav {
        padding: 0;
        position: sticky;
        top: 0;
        background-color: #E6E2EB;
    }

    .nav p {
        margin-left: 230px;
        padding: 0;
        line-height: 63px;
        margin-bottom: 0;
    }

    .nav ul {
        margin-right: 230px;
        margin-bottom: 0;
    }

    .nav ul li {
        float: left;
        list-style: none;
        display: inline;
    }

    .nav ul li:hover {
        background-color: grey;
    }

    .nav ul li a {
        display: block;
        padding: 20px;
        text-decoration: none;
        color: black;
    }

    .nav ul li:not(:last-child) {
        margin-right: 20px;
    }

    .dropdown {
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #E6E2EB;
        min-width: 160px;
        z-index: 1;
        right: 1%;
        text-align: right;
    }

    .dropdown-content .logout-btn:hover {
        background-color: orangered;
    }

    .dropdown:hover .dropdown-content {
        cursor: pointer;
        display: block;
    }

    .dropbtn:hover {
        cursor: pointer;
    }

    .body {
        width: 100%;
        padding: 50px 0;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info {
        width: 70%;
        height: auto;
        flex-direction: column;
    }

    .info p {
        margin-top: 20px;
        font-size: 1.2rem;
        text-align: justify;
    }

    footer {
        background-color: #E6E2EB;
        width: 100%;
        height: 20px;
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 2px;
        font-size: 10px;
        text-align: center;
    }
</style>