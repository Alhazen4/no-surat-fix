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

                        <vs-popup class="holamundo"  title="Tambah Surat Masuk" :active.sync="popUpActive" style="position: absolute; z-index: 98;" v-if="popUpActive">
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
                                    label="Tujuan Surat:"
                                    label-for="input-tujuanSurat">
                                    <b-form-input
                                        id="input-tujuanSurat"
                                        v-model="input_tujuanSurat"
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
                                    label-for="input-disposisi"
                                    description="Kosongkan jika tidak di-disposisi">
                                    <b-form-input
                                        id="input-disposisi"
                                        v-model="input_disposisi"
                                        type="text">
                                    </b-form-input>
                                </b-form-group>
                                
                                <b-form-group
                                    label="Catatan Tugas Disposisi:"
                                    label-for="input-catatanDisposisi"
                                    description="Kosongkan jika tidak di-disposisi">
                                    <b-form-input
                                        id="input-catatanDisposisi"
                                        v-model="input_catatanDisposisi"
                                        type="text">
                                    </b-form-input>
                                </b-form-group>

                                <b-form-group>
                                    <div class="d-flex justify-content-between">
                                        <b-form-group
                                            label="Tanggal Masuk">
                                            <el-date-picker
                                                v-model="input_tglTerima"
                                                type="date"
                                                placeholder="Pilih Tanggal Masuk"
                                                format="dd/MM/yyyy"
                                                value-format="dd-MM-yyyy">
                                            </el-date-picker>
                                        </b-form-group>

                                        <b-form-group
                                            label="Waktu Masuk">
                                            <el-time-picker
                                                v-model="input_wktTerima"
                                                placeholder="Pilih Waktu Masuk"
                                                format="HH:mm"
                                                value-format="HH:mm">
                                            </el-time-picker>
                                        </b-form-group>
                                    </div>
                                </b-form-group>

                                <b-form-group
                                    label="Foto Paket: (Hanya menerima format .PNG / .JPG / .JPEG)"
                                    label-for="input-foto">
                                    <img id="input-foto" :src="preImage" alt="" style="width:320px; height:auto;">
                                </b-form-group>
                            </b-form>

                            <vs-popup class="holamundo"  title="Error!" :active.sync="errorPopUpActive">
                                <p>Ada beberapa field yang belum terisi. <br> Harap lengkapi data terlebih dahulu!</p><br>
                                <b-button @click="errorPopUpActive=false" variant="danger">Mengerti</b-button>
                            </vs-popup>

                                <div class="d-flex justify-content-between" style="margin-top: 20px;">
                                    <div class="nav-2">
                                        <b-button @click="popUpActive=false" variant="secondary">
                                            <b-icon icon="arrow-left"></b-icon>
                                            Kembali
                                        </b-button>
                                    </div>
                                    <div class="nav-2">
                                        <label class="btn_input">
                                            <input @change="selectImage" type="file" accept="image/png, image/jpg, image/jpeg"/>
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

                    <vs-popup class="holamundo"  title="Lihat Surat Masuk" :active.sync="popUp3Active" v-if="popUp3Active">
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
                                label="Tujuan Surat:"
                                label-for="input-tujuanSurat">
                                <b-form-input
                                    id="input-tujuanSurat"
                                    v-model="input_tujuanSurat"
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
                            <b-form-group
                                label="Catatan Tugas Disposisi:"
                                label-for="input-catatanDisposisi"
                                description="Kosongkan jika tidak di-disposisi">
                                <b-form-input
                                    id="input-catatanDisposisi"
                                    v-model="input_catatanDisposisi"
                                    type="text"
                                    readonly>
                                </b-form-input>
                            </b-form-group>

                            <b-form-group>
                                <div class="d-flex justify-content-between">
                                    <b-form-group
                                        label="Tanggal Masuk">
                                        <el-date-picker
                                            v-model="input_tglTerima"
                                            type="date"
                                            placeholder="Pilih Tanggal Masuk"
                                            format="dd/MM/yyyy"
                                            value-format="dd-MM-yyyy"
                                            readonly>
                                        </el-date-picker>
                                    </b-form-group>

                                    <b-form-group
                                        label="Waktu Masuk">
                                        <el-time-picker
                                            v-model="input_wktTerima"
                                            placeholder="Pilih Waktu Masuk"
                                            format="HH:mm"
                                            value-format="HH:mm"
                                            readonly>
                                        </el-time-picker>
                                    </b-form-group>
                                </div>
                            </b-form-group>

                            <b-form-group
                                label="Foto Paket:"
                                label-for="input-foto">
                                <img id="input-foto" :src="preImage" alt="" style="width:320px; height:auto;">
                            </b-form-group>
                        </b-form>

                        <div class="d-flex justify-content-center" style="margin-top: 20px;">
                            <div class="nav-2">
                                <b-button @click="popUp3Active=false" variant="secondary">
                                    <b-icon icon="arrow-left"></b-icon>
                                    Kembali
                                </b-button>
                            </div>
                        </div>
                    </vs-popup>

                    <vs-popup class="holamundo"  title="Edit Surat Masuk" :active.sync="popUp2Active" style="position: absolute; z-index: 98;" v-if="popUp2Active">
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
                                label-for="input-tujuanSurat">
                                <b-form-input
                                    id="input-tujuanSurat"
                                    v-model="input_tujuanSurat"
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
                                label-for="input-disposisi"
                                description="Kosongkan jika tidak di-disposisi">
                                <b-form-input
                                    id="input-disposisi"
                                    v-model="input_disposisi"
                                    type="text">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group
                                label="Catatan Tugas Disposisi:"
                                label-for="input-catatanDisposisi"
                                description="Kosongkan jika tidak di-disposisi">
                                <b-form-input
                                    id="input-catatanDisposisi"
                                    v-model="input_catatanDisposisi"
                                    type="text">
                                </b-form-input>
                            </b-form-group>

                            <b-form-group>
                                <div class="d-flex justify-content-between">
                                    <b-form-group
                                        label="Tanggal Masuk">
                                        <el-date-picker
                                            v-model="input_tglTerima"
                                            type="date"
                                            placeholder="Pilih Tanggal Masuk"
                                            format="dd/MM/yyyy"
                                            value-format="dd-MM-yyyy">
                                        </el-date-picker>
                                    </b-form-group>

                                    <b-form-group
                                        label="Waktu Masuk">
                                        <el-time-picker
                                            v-model="input_wktTerima"
                                            placeholder="Pilih Waktu Masuk"
                                            format="HH:mm"
                                            value-format="HH:mm">
                                        </el-time-picker>
                                    </b-form-group>
                                </div>
                            </b-form-group>

                            <b-form-group
                                label="Foto Paket: (Hanya menerima format .PNG / .JPG / .JPEG)"
                                label-for="input-foto">
                                <img id="input-foto" :src="preImage" alt="" style="width:320px; height:auto;">
                            </b-form-group>
                        </b-form>

                            <div class="d-flex justify-content-between" style="margin-top: 20px;">
                                <div class="nav-2">
                                    <b-button @click="popUp2Active=false" variant="secondary">
                                        <b-icon icon="arrow-left"></b-icon>
                                        Kembali
                                    </b-button>
                                </div>
                                <div class="nav-2">
                                    <label class="btn_input">
                                        <input @change="selectImage" type="file" accept="image/png, image/jpg, image/jpeg"/>
                                        <b-icon icon="cloud-upload"></b-icon>
                                        Upload Foto
                                    </label>
                                </div>
                                <div class="nav-2" style="padding-right: 0;">
                                    <b-button @click="ubahSuratMasuk" variant="success" type="submit">
                                        <b-icon icon="save"></b-icon>
                                        Ubah Surat Masuk
                                    </b-button>
                                </div>
                            </div>
                    </vs-popup>

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

                        <template #cell(fotoSurat)="data">
                            <img id="input-foto" :src="data.item.image" alt="" style="width: 100px; height: 100px; object-fit: contain;">
                        </template>

                        <template #cell(opsi)="data">
                            <div class="d-flex" style="gap: 10px">
                                    <b-button @click="lihatClick(data.item._id)" variant="primary" size="sm">
                                        <b-icon icon="eye"></b-icon>
                                    </b-button>

                                    <b-button @click="ubahClick(data.item._id)" variant="warning" size="sm">
                                        <b-icon icon="pencil-square"></b-icon>
                                    </b-button>

                                    <vs-popup class="holamundo"  title="Konfirmasi Penghapusan Surat Masuk" :active.sync="popUpDelete" v-if="popUpDelete">
                                        <p>Yakin ingin <b>menghapus</b> surat masuk ini?</p>
                                        <div class="d-flex justify-content-between" style="margin-top: 20px;">
                                            <div class="nav-2">
                                                <b-button @click="popUpDelete=false" variant="secondary">
                                                    <b-icon icon="arrow-left"></b-icon>
                                                    Kembali
                                                </b-button>
                                            </div>

                                            <div class="nav-2" style="padding-right: 0;">
                                                <b-button @click="hapusSurat(data.item._id)" variant="danger" type="submit">
                                                    <b-icon icon="exclamation-circle"></b-icon>
                                                    Yakin dan Hapus Surat
                                                </b-button>
                                            </div>
                                        </div>
                                    </vs-popup>

                                    <b-button variant="danger" @click="popUpDelete=true" size="sm">
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

    import navigation from './nav.vue'
    import customFooter from './footer.vue'

    import store from '/src/store';
    import apis from './apis.js';
    import router from '@/router';
    
    // For vsPopup and ElementUI has been called at suratKeluar.vue
    // and we don't need to call it again here
    
    export default {

        async created() {
            try {
                await apis.post
                (
                    '/surat/witel', 
                    {
                        witel: store.state.witel,
                    },
                )
                .then((response) => {
                    this.suratItems = response.data;
                });
            } catch (error) {
                console.log(error);
            }

            for (let i=1; i <= this.suratItems.length; i++) {
                this.suratItems[i-1].idx = i;
            }

            if (store.state.role === 'super_admin') {
                this.deleteBtn = true
            } else {
                this.deleteBtn = false
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
                errorPopUpActive: false,
                deleteBtn: false,
                popUpDelete: false,

                keyword: '',
                perPage: 8,
                currentPage: 1,

                input_pengirim: '',
                input_perihal: '',
                input_tujuanSurat: '',
                input_namaPenerima: '',
                input_disposisi: '',
                input_catatanDisposisi: '',
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
                        key: 'catatanDisposisi',
                        label: 'Catatan Disposisi',
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
                        key: "tujuanSurat",
                        label: 'Tujuan Surat',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: "namaPenerima",
                        label: 'Nama Penerima',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: "witelPenerima",
                        label: 'Witel Penerima',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: "fotoSurat",
                        label: 'Foto',
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
                this.input_tujuanSurat = '';
                this.input_namaPenerima = '';
                this.input_disposisi = '';
                this.input_catatanDisposisi = '';
                this.input_tglTerima = '';
                this.input_wktTerima = '';
                this.current_imageURL = '';
                this.current_local_imageURL = '';

                this.preImage = this.current_imageURL;
                this.popUpActive=true
            },

            async tambahSuratMasuk() {

                if (
                    this.input_pengirim === ''
                    || this.input_perihal === ''
                    || this.input_tujuanSurat === ''
                    || this.input_namaPenerima === ''
                    || this.input_tglTerima === ''
                    || this.input_wktTerima === ''
                    || this.curImage === ''
                ) {
                    this.errorPopUpActive = true;
                } else {
                    const backend_url = process.env.NODE_ENV === 'production' ? '/api/image/' : 'http://localhost:3030/api/image/';

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
                                tujuanSurat: this.input_tujuanSurat, 
                                namaPenerima: this.input_namaPenerima,
                                witelPenerima: store.state.witel,
                                disposisi: this.input_disposisi,
                                catatanDisposisi: this.input_catatanDisposisi,
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
                this.input_tujuanSurat = '';
                this.input_namaPenerima = '';
                this.input_disposisi = '';
                this.input_catatanDisposisi = '';
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
                        const params = response.data
                        this.input_pengirim = params.pengirim;
                        this.input_perihal = params.perihal;
                        this.input_tujuanSurat = params.tujuanSurat;
                        this.input_namaPenerima = params.namaPenerima;
                        this.input_disposisi = params.disposisi;
                        this.input_catatanDisposisi = params.catatanDisposisi;

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
                        this.input_tujuanSurat = params.tujuanSurat;
                        this.input_namaPenerima = params.namaPenerima;
                        this.input_disposisi = params.disposisi;
                        this.input_catatanDisposisi = params.catatanDisposisi;
                        
                        this.input_tglTerima = params.tglTerima;
                        this.input_wktTerima = params.wktTerima;

                        this.current_imageURL = response.data.image;
                        this.current_local_imageURL = response.data.local_image;

                        this.preImage = this.current_imageURL
                    })
                } catch (error) {
                    console.log(error)
                }
                this.popUp2Active = true;
            },

            async ubahSuratMasuk() {

                if (
                    this.input_pengirim === ''
                    || this.input_perihal === ''
                    || this.input_tujuanSurat === ''
                    || this.input_namaPenerima === ''
                    || this.input_tglTerima === ''
                    || this.input_wktTerima === ''
                    || this.preImage === ''
                ) {
                    this.errorPopUpActive = true;
                    
                    // console.log('pre ', this.preImage);
                    // console.log('cur ', this.current_imageURL);
                } else {

                    const params = this.selectedSuratId
                    try {
                        const backend_url = process.env.NODE_ENV === 'production' ? '/api/image/' : 'http://localhost:3030/api/image/';
                        const formData = new FormData();
                        formData.append('image', this.curImage)

                        // console.log('pre ', this.preImage);
                        // console.log('cur ', this.current_imageURL);

                        // If the image is not cahnged
                        if (this.preImage === this.current_imageURL) {
                            // console.log('Image sama')
                            this.new_imageURL = this.current_imageURL
                            this.new_local_imageURL = this.current_local_imageURL
                        } else {
                            // console.log('Image beda')
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
                                tujuanSurat: this.input_tujuanSurat, 
                                namaPenerima: this.input_namaPenerima,
                                witelPenerima: store.state.witel,
                                disposisi: this.input_disposisi,
                                catatanDisposisi: this.input_catatanDisposisi,
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
                }
            },
        }
    }
</script>