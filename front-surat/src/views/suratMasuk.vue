<template>
    <div>
        <navigation></navigation>
        <div class="body body-padding-top">
            <div class="user-wrapper">
                <div class="table-wrapper">
                    <div class="page-title">
                        <h5>Surat Masuk</h5>
                    </div>

                    <div class="d-flex">
                        <div class="nav-2">
                            <b-button @click="$router.go(-1)" variant="secondary">
                                <b-icon icon="arrow-left"></b-icon>
                                Kembali
                            </b-button>
                        </div>
                        <div class="nav-2">
                            <b-button @click="klikSuratMasuk()" variant="success">
                                <b-icon icon="envelope"></b-icon>
                                Tambah Surat Masuk
                            </b-button>
                        </div>

                        <vs-popup class="holamundo"  title="Tambah Surat Masuk" :active.sync="popUpActive">
                            <b-form autoComplete="off" class="b-form-custom">
                                <b-form-group
                                    label="Pengirim Surat"
                                    label-for="input-pengirim">
                                    <b-form-input
                                        id="input-pengirim"
                                        v-model="input_pengirim"
                                        type="text"
                                        required>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group
                                    label="Perihal:"
                                    label-for="input-perihal">
                                    <b-form-input
                                        id="input-perihal"
                                        v-model="input_perihal"
                                        type="text"
                                        required>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group
                                    label="Tujuan Unit:"
                                    label-for="input-tujuanUnit">
                                    <b-form-input
                                        id="input-tujuanUnit"
                                        v-model="input_tujuanUnit"
                                        type="text"
                                        required>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group
                                    label="Nama Penerima:"
                                    label-for="input-namaPenerima">
                                    <b-form-input
                                        id="input-namaPenerima"
                                        v-model="input_namaPenerima"
                                        type="text"
                                        required>
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group
                                    label="Disposisi:"
                                    label-for="input-disposisi">
                                    <b-form-input
                                        id="input-disposisi"
                                        v-model="input_disposisi"
                                        type="text"
                                        required>
                                    </b-form-input>
                                </b-form-group>

                                <div class="d-flex justify-content-between">
                                    <div class="col-tgl">
                                        <b-form-group
                                            label="Tanggal Terima:"
                                            label-for="input-tanggalTerima">
                                            <b-form-datepicker 
                                                id="input-tanggalTerima" 
                                                v-model="input_tglTerima"
                                                size="sm">
                                            </b-form-datepicker>
                                        </b-form-group>
                                    </div>
                                    <div class="col-bln ms-auto">
                                        <b-form-group
                                            label="Waktu Terima:"
                                            label-for="input-tanggalTerima">
                                            <b-form-timepicker
                                                :hour12="false"
                                                v-model="input_wktTerima" 
                                                locale="en"
                                                size="sm">
                                            </b-form-timepicker>
                                        </b-form-group>
                                    </div>
                                </div>

                                <b-form-group
                                    label="Foto Paket:"
                                    label-for="input-foto">
                                    <img id="input-foto" :src="preImage" alt="" style="width:320px; height:auto;">
                                </b-form-group>
                            </b-form>

                                <div class="d-flex justify-content-between" style="margin-top: 20px;">
                                    <div class="nav-2">
                                        <b-button @click="popUpActive=false" variant="secondary">
                                            <b-icon icon="arrow-left"></b-icon>
                                            Kembali
                                        </b-button>
                                    </div>
                                    <div class="nav-2">
                                        <label class="btn_input">
                                            <input @change="selectImage" type="file"/>
                                            <b-icon icon="cloud-upload"></b-icon>
                                            Upload Foto
                                        </label>
                                    </div>
                                    <div class="nav-2" style="padding-right: 0;">
                                        <b-button @click="tambahSuratMasuk" variant="success" type="submit">
                                            <b-icon icon="save"></b-icon>
                                            Tambah Surat Masuk
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
                                aria-controls="suratTable"
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
                    id="suratTable"
                    hover
                    stacked="md"
                    :items="suratItems" 
                    :fields="columns" 
                    :filter="keyword"
                    label-sort-asc=""
                    label-sort-desc=""
                    label-sort-clear=""
                    :per-page="perPage"
                    :current-page="currentPage"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc">

                        <template #cell(opsi)="data">
                            <div class="d-flex" style="gap: 10px">
                                    <b-button @click="lihatClick(data.item._id)" variant="primary" size="sm">
                                        <b-icon icon="eye"></b-icon>
                                    </b-button>

                                    <vs-popup class="holamundo"  title="Lihat Surat Masuk" :active.sync="popUp3Active">
                                        <b-form autoComplete="off" class="b-form-custom">
                                            <b-form-group
                                                label="Pengirim Surat"
                                                label-for="input-pengirim">
                                                <b-form-input
                                                    id="input-pengirim"
                                                    v-model="input_pengirim"
                                                    type="text"
                                                    readonly>
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group
                                                label="Perihal:"
                                                label-for="input-perihal">
                                                <b-form-input
                                                    id="input-perihal"
                                                    v-model="input_perihal"
                                                    type="text"
                                                    readonly>
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group
                                                label="Tujuan Unit:"
                                                label-for="input-tujuanUnit">
                                                <b-form-input
                                                    id="input-tujuanUnit"
                                                    v-model="input_tujuanUnit"
                                                    type="text"
                                                    readonly>
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group
                                                label="Nama Penerima:"
                                                label-for="input-namaPenerima">
                                                <b-form-input
                                                    id="input-namaPenerima"
                                                    v-model="input_namaPenerima"
                                                    type="text"
                                                    readonly>
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group
                                                label="Disposisi:"
                                                label-for="input-disposisi">
                                                <b-form-input
                                                    id="input-disposisi"
                                                    v-model="input_disposisi"
                                                    type="text"
                                                    readonly>
                                                </b-form-input>
                                            </b-form-group>

                                            <div class="d-flex justify-content-between">
                                                <div class="col-tgl">
                                                    <b-form-group
                                                        label="Tanggal Terima:"
                                                        label-for="input-tanggalTerima">
                                                        <b-form-datepicker 
                                                            disabled
                                                            id="input-tanggalTerima" 
                                                            v-model="input_tglTerima"
                                                            size="sm" 
                                                        ></b-form-datepicker>
                                                    </b-form-group>
                                                </div>
                                                <div class="col-bln ms-auto">
                                                    <b-form-group
                                                        label="Waktu Terima:"
                                                        label-for="input-tanggalTerima">
                                                        <b-form-timepicker
                                                            disabled
                                                            :hour12="false"
                                                            v-model="input_wktTerima" 
                                                            size="sm" 
                                                            locale="en">
                                                        </b-form-timepicker>
                                                    </b-form-group>
                                                </div>
                                            </div>

                                            <b-form-group
                                                label="Foto Paket:"
                                                label-for="input-foto">
                                                <img id="input-foto" :src="preImage" alt="" style="width:320px; height:auto;">
                                            </b-form-group>
                                        </b-form>

                                        <div class="d-flex justify-content-center" style="margin-top: 20px;">
                                            <div class="nav-2">
                                                <b-button @click="popUp3Active=false" variant="secondary">Kembali</b-button>
                                            </div>
                                        </div>
                                    </vs-popup>

                                    <b-button @click="ubahClick(data.item._id)" variant="warning" size="sm">
                                        <b-icon icon="pencil-square"></b-icon>
                                    </b-button>

                                    <vs-popup class="holamundo"  title="Edit Surat Masuk" :active.sync="popUp2Active">
                                        <b-form autoComplete="off" class="b-form-custom">
                                            <b-form-group
                                                label="Pengirim Surat"
                                                label-for="input-pengirim">
                                                <b-form-input
                                                    id="input-pengirim"
                                                    v-model="input_pengirim"
                                                    type="text"
                                                    required>
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group
                                                label="Perihal:"
                                                label-for="input-perihal">
                                                <b-form-input
                                                    id="input-perihal"
                                                    v-model="input_perihal"
                                                    type="text"
                                                    required>
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group
                                                label="Tujuan Unit:"
                                                label-for="input-tujuanUnit">
                                                <b-form-input
                                                    id="input-tujuanUnit"
                                                    v-model="input_tujuanUnit"
                                                    type="text"
                                                    required>
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group
                                                label="Nama Penerima:"
                                                label-for="input-namaPenerima">
                                                <b-form-input
                                                    id="input-namaPenerima"
                                                    v-model="input_namaPenerima"
                                                    type="text"
                                                    required>
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group
                                                label="Disposisi:"
                                                label-for="input-disposisi">
                                                <b-form-input
                                                    id="input-disposisi"
                                                    v-model="input_disposisi"
                                                    type="text">
                                                </b-form-input>
                                            </b-form-group>

                                            <div class="d-flex justify-content-between">
                                                <div class="col-tgl">
                                                    <b-form-group
                                                        label="Tanggal Terima:"
                                                        label-for="input-tanggalTerima">
                                                        <b-form-datepicker 
                                                            id="input-tanggalTerima" 
                                                            v-model="input_tglTerima" 
                                                            size="sm" 
                                                            ></b-form-datepicker>
                                                    </b-form-group>
                                                </div>
                                                <div class="col-bln ms-auto">
                                                    <b-form-group
                                                        label="Waktu Terima:"
                                                        label-for="input-tanggalTerima">
                                                        <b-form-timepicker
                                                            :hour12="false"
                                                            v-model="input_wktTerima"
                                                            size="sm" 
                                                            locale="en">
                                                        </b-form-timepicker>
                                                    </b-form-group>
                                                </div>
                                            </div>

                                        <b-form-group
                                                label="Foto Paket:"
                                                label-for="input-foto">
                                                <img id="input-foto" :src="preImage" alt="" style="width:320px; height:auto;">
                                            </b-form-group>
                                        </b-form>

                                            <div class="d-flex justify-content-between" style="margin-top: 20px;">
                                                <div class="nav-2">
                                                    <b-button @click="popUp2Active=false" variant="secondary">Kembali</b-button>
                                                </div>
                                                <div class="nav-2">
                                                    <label class="btn_input">
                                                        <input @change="selectImage" type="file"/>
                                                        Upload Foto
                                                    </label>
                                                </div>
                                                <div class="nav-2" style="padding-right: 0;">
                                                    <b-button @click="ubahSuratMasuk" variant="success" type="submit">Ubah Surat Masuk</b-button>
                                                </div>
                                            </div>
                                    </vs-popup>

                                    <b-button variant="danger" @click="hapusSurat(data.item._id)" size="sm">
                                        <b-icon icon="trash"></b-icon>
                                    </b-button>
                            </div>
                        </template>
                    </b-table>
                    {{ this.suratItems['image'] }}
                </div>
            </div>
        </div>
        <customFooter></customFooter>
    </div>
</template>

<script>

    import navigation from './nav.vue'
    import customFooter from './footer.vue'

    import store from '/src/store';
    import apis from './apis.js';
    import router from '@/router';

    import Vue from 'vue'
    import { vsPopup } from 'vuesax'
    import 'vuesax/dist/vuesax.css'

    Vue.use(vsPopup)

    export default {
        async mounted() {

            try {
                await apis.get('/surat')
                .then((response) => {
                    this.suratItems = response.data;
                });
            } catch (error) {
                console.log(error);
            }

            for (let i=1; i <= this.suratItems.length; i++) {
                // console.log(i);
                // console.log(this.suratItems[i-1]);
                this.suratItems[i-1].idx = i;
            }
        },
        
        name: 'suratMasuk',
        data() {
            return {
                sortBy: 'idx',
                sortDesc: true,
                popUpActive: false,
                popUp2Active: false,
                popUp3Active: false,
                selectedSuratId: '',

                keyword: '',
                perPage: 8,
                currentPage: 1,

                input_pengirim: '',
                input_perihal: '',
                input_tujuanUnit: '',
                input_namaPenerima: '',
                input_disposisi: '',
                curImage: '',
                preImage: '',

                input_tglTerima: '',
                input_wktTerima: '',

                columns: [  
                    {
                        key: 'idx',
                        label: 'No',
                        sortable: true
                    },
                    {
                        key: 'pengirim',
                        label: 'Nama Pengirim',
                        sortable: true,
                        thStyle: { width: "40vh"}
                    },
                    {
                        key: 'disposisi',
                        label: 'Disposisi',
                        sortable: true,
                        thStyle: { width: "40vh"}
                    },
                    {
                        key: 'tglTerima',
                        label: 'Tanggal Terima',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: 'wktTerima',
                        label: 'Waktu Terima',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: 'perihal',
                        label: 'Perihal',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: "tujuanUnit",
                        label: 'Tujuan Unit',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: "namaPenerima",
                        label: 'Nama Penerima',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: "opsi",
                        label: 'Opsi',
                        thStyle: { width: "30vh"}
                    }
                ],
                suratItems: [],

                current_imageURL: '',
                current_local_imageURL: '',
                new_imageURL: '',
                new_local_imageURL: '',
            }
        },

        computed: {
            // For pagination
            rows() {
                // return this.userItemsTest.length
                return this.suratItems.length
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

            selectImage: function (event) {
                this.curImage = event.target.files[0]
                this.preImage = URL.createObjectURL(this.curImage);
            },

            klikSuratMasuk() {
                this.input_pengirim = '';
                this.input_perihal = '';
                this.input_tujuanUnit = '';
                this.input_namaPenerima = '';
                this.input_disposisi = '';
                this.input_tglTerima = '';
                this.input_wktTerima = '';
                this.current_imageURL = '';
                this.current_local_imageURL = '';

                this.preImage = this.current_imageURL;
                this.popUpActive=true
            },

            async tambahSuratMasuk() {
                const backend_url = process.env.NODE_ENV === 'production' ? '/api/image/' : 'http://localhost:4041/api/image/';

                const formData = new FormData();
                formData.append('image', this.curImage)

                if (this.curImage === '') {
                    console.log('Error: no image selected!');
                } else {
                    
                    // Upload the image to server
                    try {
                        await apis.post('/image', formData)
                        .then(res => {
                            this.local_imageURL = res.data.file,
                            this.imageURL = `${backend_url}${this.local_imageURL}`
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }

                // Save the data to MongoDB 
                try {
                    await apis.post
                    (
                        '/surat', 
                        { 
                            idx: '',
                            pengirim: this.input_pengirim, 
                            tglTerima: this.input_tglTerima,
                            wktTerima: this.input_wktTerima,
                            perihal: this.input_perihal, 
                            tujuanUnit: this.input_tujuanUnit, 
                            namaPenerima: this.input_namaPenerima,
                            disposisi: this.input_disposisi,
                            image: `${this.imageURL}`,
                            local_image: `${this.local_imageURL}`,
                        
                        },
                        { headers: { 'Content-Type': 'application/json' } }
                    )
                    this.popUpActive = false
                    router.go(0)
                } catch (error) {
                    console.log(error)
                }
            },
                
            async hapusSurat(id) {
                this.selectedSuratId = id;
                try {
                    apis.get
                    (
                        `/surat/${this.selectedSuratId}`,
                    )
                    .then(response => {
                        this.current_local_imageURL = response.data.local_image;
                    })
                } catch (error) {
                    console.log(error)
                }

                try {
                    await apis.delete(`/surat/${id}`);
                } catch (error) {
                    console.log(error)
                }

                try {
                    await apis.delete(`/image`,
                    {
                        data: { image: this.current_local_imageURL },
                    });
                } catch (error) {
                    console.log(error)
                    
                }
                this.$router.go();
            },

            lihatClick(id) {
                this.input_pengirim = '';
                this.input_perihal = '';
                this.input_tujuanUnit = '';
                this.input_namaPenerima = '';
                this.input_disposisi = '';
                this.input_tglTerima = '';
                this.input_wktTerima = '';
                this.current_imageURL = '';
                this.current_local_imageURL = '';
                this.preImage = this.current_imageURL;

                this.selectedSuratId = id;
                // console.log(this.selectedSuratId);
                try {
                    apis.get
                    (
                        `/surat/${this.selectedSuratId}`,
                    )
                    .then(response => {
                        // console.log(response);
                        const params = response.data
                        this.input_pengirim = params.pengirim;
                        this.input_perihal = params.perihal;
                        this.input_tujuanUnit = params.tujuanUnit;
                        this.input_namaPenerima = params.namaPenerima;
                        this.input_disposisi = params.disposisi;

                        this.input_tglTerima = params.tglTerima;
                        this.input_wktTerima = params.wktTerima;
                        
                        this.current_imageURL = response.data.image;
                        this.current_local_imageURL = response.data.local_image;

                        this.preImage = this.current_imageURL
                    })
                } catch (error) {
                    console.log(error)
                }
                this.popUp3Active = true;
            },

            ubahClick(id) {
                this.selectedSuratId = id;
                // console.log(this.selectedSuratId);
                try {
                    apis.get
                    (
                        `/surat/${this.selectedSuratId}`,
                    )
                    .then(response => {
                        const params = response.data
                        this.input_pengirim = params.pengirim;
                        this.input_perihal = params.perihal;
                        this.input_tujuanUnit = params.tujuanUnit;
                        this.input_namaPenerima = params.namaPenerima;
                        this.input_disposisi = params.disposisi;
                        
                        this.input_tglTerima = params.tglTerima;
                        this.input_wktTerima = params.wktTerima;

                        this.current_imageURL = response.data.image;
                        this.current_local_imageURL = response.data.local_image;

                        this.preImage = this.current_imageURL
                        console.log(this.preImage);
                        console.log(this.current_imageURL);
                    })
                } catch (error) {
                    console.log(error)
                }
                this.popUp2Active = true;
            },

            async ubahSuratMasuk() {
                const params = this.selectedSuratId
                try {
                    const backend_url = process.env.NODE_ENV === 'production' ? '/api/image/' : 'http://localhost:4041/api/image/';
                    const formData = new FormData();
                    formData.append('image', this.curImage)

                    console.log('pre ', this.preImage);
                    console.log('cur ', this.current_imageURL);

                    // If the image is not cahnged
                    if (this.preImage === this.current_imageURL) {
                        console.log('Image sama')
                        this.new_imageURL = this.current_imageURL
                        this.new_local_imageURL = this.current_local_imageURL
                    } else {
                        console.log('Image beda')
                        try {
                            // Upload the image to the database, set the new image URL and the new image local database URL
                            await apis.post('/image', formData)
                            .then(res => {
                                this.new_imageURL = `${backend_url}${res.data.file}`
                                this.new_local_imageURL = `${res.data.file}`
                            })
                            // Delete the current image with call its API and send the current image local database URL
                            await apis.delete(`/image`,
                            {
                                data: { image: this.current_local_imageURL },
                            });
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    
                    // // Update the database with new data, such as "selected nama", "selected no_telp", "new imageURL", and "new local image URL"
                    await apis.patch
                    (
                        `/surat/${params}`, 
                        { 
                            pengirim: this.input_pengirim, 
                            tglTerima: this.input_tglTerima,
                            wktTerima: this.input_wktTerima,
                            perihal: this.input_perihal, 
                            tujuanUnit: this.input_tujuanUnit, 
                            namaPenerima: this.input_namaPenerima,
                            disposisi: this.input_disposisi,
                            image: `${this.new_imageURL}`,
                            local_image: `${this.new_local_imageURL}`,
                        },
                        { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
                    )
                    console.log('Success');
                    router.go(0)
                } catch (error) {
                    console.log(error)
                }
            },
        }
    }
</script>

<style></style>