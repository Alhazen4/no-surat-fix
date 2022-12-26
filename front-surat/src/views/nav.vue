<template>
    <div class="nav justify-content-between">
        <div class="logo">
            <a href="/homePage">
                <img src="../assets/logoSerat.png" alt="web logo">
            </a>
        </div>
        <ul>
            <li><a href="/homePage">Home</a></li>
            <li><a href="/suratKeluar">Surat Keluar</a></li>
            <li><a href="/suratMasuk" v-if="showSuratMasuk">Surat Masuk</a></li>
            <li><a href="/daftarUser" v-if="showDaftarUser">Daftar User</a></li>
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
</template>

<script>

    import store from '/src/store';
    import apis from './apis.js';
    
    export default {
        name: 'navigation',

        async mounted() {

            if (store.state.role === 'super_admin') {
                this.showDaftarUser = true
                this.showSuratMasuk = true
            } else if (store.state.role === 'secret') {
                this.showDaftarUser = false
                this.showSuratMasuk = true
            } else {
                this.showDaftarUser = false
                this.showSuratMasuk = false
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

        data() {
                return {
                    nama_admin:'',
                }
        },

        methods: {
            logout() {
                store.dispatch('logoutAction')
            }
        },
    }

</script>

<style>
    .nav {
        background-color: whitesmoke;
        padding: 0;
        position: sticky;
        top: 0;
        z-index: 97;
        border-bottom: 5px solid #374f7a;
    }

    .nav .logo {
        margin-left: 230px;
        line-height: 63px;
    }

    .nav .logo img {
        width: 120px; 
        height: auto;
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
        background-color: #374f7a;
    }

    .nav ul li a {
        display: block;
        padding: 20px;
        text-decoration: none;
        color: #202e47;
    }

    .nav ul li a:hover {
        color: white;
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
        background-color: #374f7a;
        min-width: 160px;
        z-index: 1;
        right: 1%;
        text-align: right;
        color: white;
    }

    .dropdown-content .logout-btn {
        color: white;
    }

    .dropdown-content .logout-btn:hover {
        background-color: #cd4d5e;
    }

    .dropdown:hover .dropdown-content {
        cursor: pointer;
        display: block;
    }

    .dropbtn:hover {
        cursor: pointer;
    }
</style>