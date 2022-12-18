<template>
    <div class="nav justify-content-between">
        <p><b-icon icon="envelope-open-fill"></b-icon><b> Penomoran Surat App</b></p>
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
</template>

<script>

    import store from '/src/store';
    import apis from './apis.js';
    
    export default {
        name: 'navigation',

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

        data() {
                return {
                    nama_admin:'',
                    display: 'none',
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
        padding: 0;
        position: sticky;
        top: 0;
        background-color: #202e47;
        color: white;
        z-index: 97;
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
        background-color: #374f7a;
    }

    .nav ul li a {
        display: block;
        padding: 20px;
        text-decoration: none;
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
        background-color: #202e47;
        min-width: 160px;
        z-index: 1;
        right: 1%;
        text-align: right;
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