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
            <div class="user-wrapper">
                <div class="table-wrapper">
                    <div class="page-title">
                        <h5>Daftar User</h5>
                    </div>
                    <div class="d-flex">
                        <div class="p-2">
                            <b-button @click="$router.go(-1)" variant="secondary">
                                <b-icon icon="arrow-left"></b-icon>
                                Kembali
                            </b-button>
                        </div>
                        <div class="p-2">
                            <b-button @click="popUpActive=true" variant="success">
                                <b-icon icon="person-plus"></b-icon>
                                Tambah User
                            </b-button>
                        </div>

                        <vs-popup class="holamundo"  title="Tambah User" :active.sync="popUpActive">
                            <b-form autoComplete="off">
                                <b-form-group
                                    label="Nama:"
                                    label-for="input-nama">

                                    <b-form-input
                                        id="input-nama"
                                        v-model="input_nama"
                                        type="text"
                                        required>
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group
                                    label="Email:"
                                    label-for="input-email">

                                    <b-form-input
                                        id="input-email"
                                        v-model="input_email"
                                        type="text"
                                        required>
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group
                                    label="Username:"
                                    label-for="input-username">

                                    <b-form-input
                                        id="input-username"
                                        v-model="input_username"
                                        type="text"
                                        required>
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group
                                    label="Password:"
                                    label-for="input-password">

                                    <b-form-input
                                        id="input-password"
                                        v-model="input_password"
                                        type="text"
                                        required>
                                    </b-form-input>
                                </b-form-group>
                            </b-form>

                            <div class="d-flex justify-content-between">
                                <div class="p-2">
                                    <b-button @click="popUpActive=false" variant="secondary">Kembali</b-button>
                                </div>
                                <div class="p-2">
                                    <b-button @click="tambahUser" variant="success" type="submit">Tambah User</b-button>
                                </div>
                            </div>
                        </vs-popup>

                        <div class="d-flex ms-auto p-2" style="flex-direction: row;">
                            <b-form-input
                                v-model="keyword"
                                placeholder="Type to Search"
                            >
                        </b-form-input>
                        </div>
                    </div>

                    <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="userTable"
                    ></b-pagination>

                    <b-table 
                    id="userTable"
                    hover
                    stacked="md"
                    :items="userItems" 
                    :fields="columns" 
                    :filter="keyword"
                    label-sort-asc=""
                    label-sort-desc=""
                    label-sort-clear=""
                    :per-page="perPage"
                    :current-page="currentPage">

                        <!-- <template #cell(index)="data">
                            {{ data.index + 1 }}
                        </template> -->

                        <template #cell(opsi)="data">
                            <div class="d-flex" style="gap: 10px">
                                    <b-button @click="ubahClick(data.item._id)" variant="warning" size="sm">
                                        <b-icon icon="pencil-square"></b-icon>
                                    </b-button>
    
                                    <vs-popup class="holamundo"  title="Ubah User" :active.sync="popUp2Active">
                                        <b-form autoComplete="off">
                                            <b-form-group
                                                label="Nama:"
                                                label-for="input-nama">

                                                <b-form-input
                                                    id="input-nama"
                                                    v-model="input_nama"
                                                    type="text"
                                                    required>
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group
                                                label="Email:"
                                                label-for="input-email">

                                                <b-form-input
                                                    id="input-email"
                                                    v-model="input_email"
                                                    type="text"
                                                    required>
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group
                                                label="Role:"
                                                label-for="input-role">
                                                
                                                <model-list-select :list="dataRoles"
                                                v-model="selectedRole"
                                                option-value="role_id"
                                                option-text="nama_role">
                                                </model-list-select>
                                            </b-form-group>

                                            <b-form-group
                                                label="Username:"
                                                label-for="input-username">

                                                <b-form-input
                                                    id="input-username"
                                                    v-model="input_username"
                                                    type="text"
                                                    required>
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group
                                                label="Password:"
                                                label-for="input-password">

                                                <b-form-input
                                                    id="input-password"
                                                    v-model="input_password"
                                                    type="text"
                                                    required>
                                                </b-form-input>
                                            </b-form-group>
                                        </b-form>

                                        <div class="d-flex justify-content-between">
                                            <div class="p-2">
                                                <b-button @click="popUp2Active=false" variant="secondary">Kembali</b-button>
                                            </div>
                                            <div class="p-2">
                                                <b-button @click="ubahUser" variant="success" type="submit">Ubah User</b-button>
                                            </div>
                                        </div>
                                    </vs-popup>

                                    <b-button variant="danger" @click="hapusUser(data.item._id)" size="sm">
                                        <b-icon icon="trash"></b-icon>
                                    </b-button>
                            </div>
                        </template>
                    </b-table>
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
    import apis from '../apis.js';
    import router from '@/router';

    import Vue from 'vue'
    import { vsPopup } from 'vuesax'
    import 'vuesax/dist/vuesax.css'

    Vue.use(vsPopup)

    export default {
        async mounted() {

            try {
                await apis.get('/users')
                .then((response) => {
                    this.userItems = response.data;
                });
            } catch (error) {
                console.log(error);
            }

            
            for (let i=1; i <= this.userItems.length; i++) {
                console.log(i);
                console.log(this.userItems[i-1]);
                this.userItems[i-1].idx = i;
            }

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
        
        name: 'daftarUser',
        data() {
            return {
                nama_admin:'',
                display: 'none',
                popUpActive: false,
                popUp2Active: false,
                selectedId: '',

                keyword: '',
                perPage: 8,
                currentPage: 1,

                input_nama: '',
                input_username: '',
                input_email: '',
                input_password: '',

                columns: [  
                {
                    key: 'idx',
                    label: 'No',
                },
                {
                    key: 'nama',
                    label: 'Nama',
                    sortable: true,
                    thStyle: { width: "40vh"}
                },
                {
                    key: 'email',
                    label: 'Email',
                    thStyle: { width: "30vh"}
                },
                {
                    key: 'role',
                    label: 'Role',
                    thStyle: { width: "30vh"}
                },
                {
                    key: "opsi",
                    label: 'Opsi',
                    thStyle: { width: "30vh"}
                }
                ],
                userItems: [],
                userItemsTest: [
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                    { nama: 'a', email: 'a@example.com', role: 'a' },
                ],
            }
        },

        computed: {
            rows() {
                // return this.userItemsTest.length
                return this.userItems.length
            },
        },

        methods: {
            logout() {
                store.dispatch('logoutAction')
            },

            async tambahUser() {
                try {
                    await apis.post
                    (
                        '/signup', 
                        { 
                            idx: '',
                            nama: this.input_nama,
                            email: this.input_email,
                            role: 'admin',
                            username: this.input_username,
                            password: this.input_password
                        },
                        { headers: { 'Content-Type': 'application/json' } }
                    )
                    .then(response => {
                        console.log(response.data);
                    })
                    this.popUpActive = false
                    router.go(0)
                } catch (error) {
                    console.log(error)
                }
            },
                
            async hapusUser(id) {
                try {
                    await apis.delete(`/user/${id}`);
                    this.$router.go();
                } catch (error) {
                    console.log(error)
                }
            },

            ubahClick(id) {
                this.selectedId = id;
                try {
                    apis.get
                    (
                        `/user/${this.selectedId}`,
                    )
                    .then(response => {
                        console.log(response);
                        this.input_nama = response.data.nama;
                        this.input_email = response.data.email;
                        this.input_username = response.data.username;
                        this.input_password = response.data.password;
                    })
                } catch (error) {
                    console.log(error)
                }
                this.popUp2Active = true;
            },

            async ubahUser() {
                try {
                    await apis.patch
                    (
                        `/user/${this.selectedId}`, 
                        { 
                            nama: this.input_nama,
                            email: this.input_email,
                            role: 'admin',
                            username: this.input_username,
                            password: this.input_password
                        },
                        { headers: { 'Content-Type': 'application/json' } }
                    )
                    .then(response => {console.log('Success Edit!')})
                    this.popUp2Active = false;
                    this.$router.go(0);
                } catch (error) {
                    console.log(error)
                }
            }
        },
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

    .user-wrapper {
        display: flex;
        justify-content: center;
        align-items: start;
        border: 100px red;

    }

    .table-wrapper {
        width: 70%;
        height: auto;
        top: 0;
    }

    .page-title {
        background-color: #E6E2EB;
        width: 100%;
        height: 40px;
        padding: 8px;
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