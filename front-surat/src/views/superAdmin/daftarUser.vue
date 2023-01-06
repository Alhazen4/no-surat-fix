<template>
    <div>
        <navigation></navigation>
        <div class="body body-padding-top">
            <div class="user-wrapper">
                <div class="table-wrapper">
                    <div class="page-title">
                        <h5>Daftar User</h5>
                    </div>
                    <div class="d-flex">
                        <div class="nav-2">
                            <b-button @click="$router.go(-1)" variant="secondary">
                                <b-icon icon="arrow-left"></b-icon>
                                Kembali
                            </b-button>
                        </div>
                        <div class="nav-2">
                            <b-button @click="klikTambahUser()" variant="success">
                                <b-icon icon="person-plus"></b-icon>
                                Tambah User
                            </b-button>
                        </div>

                        <vs-popup class="holamundo"  title="Tambah User" :active.sync="popUpActive">
                            <b-form autoComplete="off" class="b-form-custom">
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
                                    label="Unit / Witel:">

                                    <b-form-select
                                        class="form-select-custom"
                                        v-model="input_unitOrWitel"
                                        :options="witelOptions" 
                                        required>
                                    </b-form-select>
                                </b-form-group>

                                <b-form-group
                                    label="Role">

                                    <b-form-select
                                        class="form-select-custom"
                                        v-model="input_role" 
                                        :options="roleOptions" 
                                        required>
                                    </b-form-select>
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
                                    label="Nomor Telepon:"
                                    label-for="input-email">

                                    <b-form-input
                                        id="input-noTelp"
                                        v-model="input_noTelp"
                                        type="number"
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

                            <vs-popup class="holamundo"  title="Error!" :active.sync="errorPopUpActive">
                                <p>Ada beberapa field yang belum terisi. <br> Harap lengkapi data terlebih dahulu!</p><br>
                                <b-button @click="errorPopUpActive=false" variant="danger">
                                    <b-icon icon="exclamation-circle"></b-icon>
                                    Mengerti
                                </b-button>
                            </vs-popup>

                            <div class="d-flex justify-content-between" style="padding-top: 20px;">
                                <div class="nav-2">
                                    <b-button @click="popUpActive=false" variant="secondary">
                                        <b-icon icon="arrow-left"></b-icon>
                                        Kembali
                                    </b-button>
                                </div>
                                <div class="nav-2" style="padding-right: 0;">
                                    <b-button @click="tambahUser()" variant="success" type="submit">
                                        <b-icon icon="person-plus"></b-icon>
                                        Tambah User
                                    </b-button>
                                </div>
                            </div>
                        </vs-popup>
                    </div>
                    
                    <div class="d-flex nav-3" style="flex-direction: row;">
                        <div>
                            <b-pagination
                            v-model="currentPage"
                            :total-rows="rows"
                            :per-page="perPage"
                            aria-controls="userTable"
                            ></b-pagination>
                        </div>

                        <div class="ms-auto">
                            <b-form-input
                                v-model="keyword"
                                placeholder="Type to Search">
                            </b-form-input>
                        </div>
                    </div>

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

                        <template #cell(opsi)="data">
                            <div class="d-flex" style="gap: 10px">
                                    <b-button @click="ubahClick(data.item._id)" variant="warning" size="sm">
                                        <b-icon icon="pencil-square"></b-icon>
                                    </b-button>
    
                                    <vs-popup class="holamundo"  title="Ubah User" :active.sync="popUp2Active">
                                        <b-form autoComplete="off" class="b-form-custom">
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
                                                label="Unit / Witel:">

                                                <b-form-select
                                                    class="form-select-custom"
                                                    v-model="input_unitOrWitel"
                                                    :options="witelOptions" 
                                                    required>
                                                </b-form-select>
                                            </b-form-group>

                                            <b-form-group
                                                label="Role">

                                                <b-form-select
                                                    class="form-select-custom"
                                                    v-model="input_role" 
                                                    :options="roleOptions" 
                                                    required>
                                                </b-form-select>
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
                                                label="Nomor Telepon:"
                                                label-for="input-email">

                                                <b-form-input
                                                    id="input-noTelp"
                                                    v-model="input_noTelp"
                                                    type="number"
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

                                        <vs-popup class="holamundo"  title="Error!" :active.sync="errorPopUpActive" v-if="errorPopUpActive">
                                            <p>Ada beberapa field yang belum terisi. <br> Harap lengkapi data terlebih dahulu!</p><br>
                                            <b-button @click="errorPopUpActive=false" variant="danger">
                                                <b-icon icon="exclamation-circle"></b-icon>
                                                Mengerti
                                            </b-button>
                                        </vs-popup>

                                        <div class="d-flex justify-content-between" style="padding-top: 20px;">
                                            <div class="nav-2">
                                                <b-button @click="popUp2Active=false" variant="secondary">
                                                    <b-icon icon="arrow-left"></b-icon>
                                                    Kembali
                                                </b-button>
                                            </div>
                                            <div class="nav-2" style="padding-right: 0;">
                                                <b-button @click="ubahUser" variant="success" type="submit">
                                                    <b-icon icon="pencil-square"></b-icon>
                                                    Ubah User
                                                </b-button>
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
        <customFooter></customFooter>
    </div>
</template>

<script>

    import navigation from '../nav.vue';
    import customFooter from '../footer.vue';

    import store from '/src/store';
    import apis from '../apis.js';
    import router from '@/router';

    // For vsPopup and ElementUI has been called at suratKeluar.vue
    // and we don't need to call it again here

    export default {

        async created() {
            try {
                await apis.post('/users', { role: store.state.role })
                .then((response) => {
                    this.userItems = response.data;
                });
            } catch (error) {
                console.log(error);
            }

            for (let i=1; i <= this.userItems.length; i++) {
                this.userItems[i-1].idx = i;
            }
        },
        
        name: 'daftarUser',
        data() {
            return {
                popUpActive: false,
                popUp2Active: false,
                selectedId: '',
                errorPopUpActive: false,

                keyword: '',
                perPage: 8,
                currentPage: 1,

                input_nama: '',
                input_unitOrWitel: '',
                input_role: '',
                input_email: '',
                input_noTelp: null,
                input_username: '',
                input_password: '',

                witelOptions: [
                    { value: 'REG4', text: 'REG4'},
                    { value: 'SMG', text: 'Semarang'},
                    { value: 'YGY', text: 'Yogyakarta'},
                    { value: 'SLO', text: 'Solo'},
                    { value: 'MGL', text: 'Magelang'},
                    { value: 'PWK', text: 'Purwokerto'},
                    { value: 'PKL', text: 'Pekalongan'},
                    { value: 'KDS', text: 'Kudus'},
                ],

                roleOptions: [
                    { value: 'secret', text: 'secret' },
                    { value: 'admin', text: 'admin' },
                ],

                columns: [  
                {
                    key: 'idx',
                    label: 'No',
                    sortable: true
                },
                {
                    key: 'nama',
                    label: 'Nama',
                    sortable: true,
                    thStyle: { width: "40vh"}
                },
                {
                    key: 'unitOrWitel',
                    label: 'Unit / Witel',
                    sortable: true,
                    thStyle: { width: "40vh"}
                },
                {
                    key: 'email',
                    label: 'Email',
                    thStyle: { width: "30vh"}
                },
                {
                    key: 'noTelp',
                    label: 'No.Telepon',
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
            }
        },

        computed: {
            rows() {
                // return this.userItemsTest.length
                return this.userItems.length
            },
        },

        components: {
            navigation,
            customFooter
        },

        methods: {
            logout() {
                store.dispatch('logoutAction')
            },

            klikTambahUser() {
                this.input_nama = '';
                this.input_unitOrWitel === ''
                this.input_role === ''
                this.input_email = '';
                this.input_noTelp === null
                this.input_username = '';
                this.input_password = '';
                this.popUpActive=true;
            },

            async tambahUser() {
                if (
                    this.input_nama === ''
                    || this.input_unitOrWitel === ''
                    || this.input_role === ''
                    || this.input_username === ''
                    || this.input_email === ''
                    || this.input_noTelp === null
                    || this.input_password === ''
                ) {
                    this.errorPopUpActive = true
                } else {
                    try {
                        await apis.post
                        (
                            '/signup', 
                            { 
                                idx: '',
                                nama: this.input_nama,
                                unitOrWitel: this.input_unitOrWitel,
                                email: this.input_email,
                                noTelp: this.input_noTelp,
                                role: this.input_role,
                                username: this.input_username,
                                password: this.input_password
                            },
                            { headers: { 'Content-Type': 'application/json' } }
                        )
                        this.popUpActive = false
                        router.go(0)
                    } catch (error) {
                        console.log(error)
                    }
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
                        this.input_nama = response.data.nama;
                        this.input_unitOrWitel = response.data.unitOrWitel;
                        this.input_role = response.data.role;
                        this.input_email = response.data.email;
                        this.input_noTelp = response.data.noTelp;
                        this.input_username = response.data.username;
                        this.input_password = response.data.password;
                    })
                } catch (error) {
                    console.log(error)
                }
                this.popUp2Active = true;
            },

            async ubahUser() {

                if (
                    this.input_nama === ''
                    || this.input_unitOrWitel === ''
                    || this.input_role === ''
                    || this.input_username === ''
                    || this.input_email === ''
                    || this.input_noTelp === null
                    || this.input_password === ''
                ) {
                    this.errorPopUpActive = true;
                } else {
                    try {
                        await apis.patch
                        (
                            `/user/${this.selectedId}`, 
                            { 
                                nama: this.input_nama,
                                unitOrWitel: this.input_unitOrWitel,
                                role: this.input_role,
                                email: this.input_email,
                                noTelp: this.input_noTelp,
                                username: this.input_username,
                                password: this.input_password
                            },
                            { headers: { 'Content-Type': 'application/json' } }
                        )
                        this.popUp2Active = false;
                        this.$router.go(0);
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        },
    }
</script>

<style>
    .nav-2 {
        padding: 8px 8px 8px 0;
    }

    .nav-3 {
        padding: 8px 8px 0 0;
    }

    .b-form-custom {
        display: flex; 
        flex-direction: column; 
        gap: 20px;
    }

    .form-select-custom {
        height: 40px;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        border: 1px solid lightgray;
        border-radius: 5px;
    }
</style>