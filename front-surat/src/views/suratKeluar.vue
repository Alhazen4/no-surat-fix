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
                        <h5>Surat Keluar</h5>
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
                                <b-icon icon="envelope"></b-icon>
                                Tambah Surat Keluar
                            </b-button>
                        </div>

                        <vs-popup class="holamundo"  title="Tambah Surat Keluar" :active.sync="popUpActive">
                            <b-form class="row form">

                                <div class="col-md-12" :style="{ display }">
                                    <label class="form-label">No Surat Cadangan</label>
                                    <b-form-select :disabled="noSuratCadanganField" class="select form-select" v-model="noSuratCadanganSelected" :options="noSuratCadangan"/>
                                </div>

                                <b-form-checkbox
                                    name="useNoSuratCadangan"
                                    v-model="noSuratCadanganField"
                                    value=true
                                    size="md">
                                    Tidak Pakai Nomor Cadangan
                                </b-form-checkbox>

                                <div class="col-md-12">
                                    <label class="form-label">Kode Surat</label>
                                    <b-form-select class="select form-select" v-model="kodeSuratSelected" :options="dataKodeSurat"/>
                                </div>

                                <div class="col-md-12">
                                    <label class="form-label">Klasifikasi Masalah Utama</label>
                                    <b-form-select @change="umumChange($event)" class="select form-select" v-model="masalahUtamaSelected" :options="dataMasalahUtama"/>
                                </div>

                                <div class="col-md-12"  v-show='cabang1display'>
                                    <label class="form-label">Klasifikasi Masalah Cabang 1</label>
                                    <b-form-select @change="cabang1Change($event)" class="select form-select" v-model="masalahCabang1Selected" :options="masalahCabang1"/>
                                </div>
                                
                                <div class="col-md-12"  v-show='cabang2display'>
                                    <label class="form-label">Klasifikasi Masalah Cabang 2</label>
                                    <b-form-select @change="cabang2Change($event)" class="select form-select" v-model="masalahCabang2Selected" :options="masalahCabang2"/>
                                </div>
                                
                                <div class="col-md-12">
                                    <b-form-group
                                        label="Pejabat yang ber-TTD">

                                        <model-list-select 
                                        class="col-md-12"
                                        :list="dataPejabat"
                                        v-model="pejabatTtdSelected"
                                        option-value="value"
                                        :custom-text="pejabatTtdText">
                                        </model-list-select>
                                    </b-form-group>
                                </div>
                                
                                <div class="col-md-12">
                                    <label class="form-label">Perihal</label>
                                    <b-form-input class="select" type="text" v-model="input_perihal"/>
                                </div>

                                <div class="col-md-12">
                                    <label class="form-label">Tujuan Unit</label>
                                    <b-form-input class="select" type="text" v-model="input_tujuanUnit"/>
                                </div>
                                
                                <div class="col-md-12">
                                    <label class="form-label">Keterangan</label>
                                    <b-form-input class="select" type="text" v-model="input_keterangan"/>
                                </div>
                            
                                <div class="col-md-5">
                                    <div class="row justify-content-between">
                                        <div class="col-tgl">
                                            <b-form-group
                                                label="Tanggal Keluar:"
                                                label-for="input-tanggalKeluar">
                                                <b-form-datepicker 
                                                    id="input-tanggalKeluar" 
                                                    v-model="input_tglKeluar" 
                                                    class="mb-2"></b-form-datepicker>
                                            </b-form-group>
                                        </div>
                                        <div class="col-bln">
                                            <b-form-group
                                                label="Waktu Keluar:"
                                                label-for="input-tanggalKeluar">
                                                <b-form-timepicker
                                                    id="input-tanggalKeluar"
                                                    :hour12="false"
                                                    v-model="input_wktKeluar" 
                                                    locale="en">
                                                </b-form-timepicker>
                                            </b-form-group>
                                        </div>
                                    </div>
                                </div>

                                <vs-popup class="holamundo"  title="Error!" :active.sync="errorPopUpActive">
                                    <p>Ada beberapa field yang belum terisi. <br> Harap lengkapi data diatas terlebih dahulu!</p><br>
                                    <b-button @click="errorPopUpActive=false" variant="danger">Mengerti</b-button>
                                </vs-popup>

                                <div class="d-flex justify-content-between">
                                    <div class="p-2">
                                        <b-button @click="popUpActive=false" variant="secondary">Kembali</b-button>
                                    </div>

                                    <div class="p-2">
                                        <b-button @click="tambahSuratKeluar()" variant="success">Simpan Data</b-button>
                                    </div>
                                </div>
                            </b-form>
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
                        aria-controls="suratTable"
                    ></b-pagination>

                    <b-table 
                    id="suratTable"
                    hover
                    striped
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
                                    <b-button @click="ubahClick(data.item._id)" variant="warning" size="sm">
                                        <b-icon icon="pencil-square"></b-icon>
                                    </b-button>

                                    <vs-popup class="holamundo"  title="Edit Surat Keluar" :active.sync="popUp2Active">
                                        <b-form class="row form">

                                            <div class="col-md-12">
                                                <label class="form-label">Kode Surat</label>
                                                <b-form-select class="select form-select" v-model="kodeSuratSelected" :options="dataKodeSurat"/>
                                            </div>

                                            <div class="col-md-12">
                                                <label class="form-label">Klasifikasi Masalah Utama</label>
                                                <b-form-select @change="umumChange($event)" class="select form-select" v-model="masalahUtamaSelected" :options="dataMasalahUtama"/>
                                            </div>

                                            <div class="col-md-12" v-show='cabang1display'>
                                                <label class="form-label">Klasifikasi Masalah Cabang 1</label>
                                                <b-form-select @change="cabang1Change($event)"  class="select form-select" v-model="masalahCabang1Selected" :options="masalahCabang1"/>
                                            </div>

                                            <div class="col-md-12" v-show='cabang2display'>
                                                <label class="form-label">Klasifikasi Masalah Cabang 2</label>
                                                <b-form-select @change="cabang2Change($event)" class="select form-select" v-model="masalahCabang2Selected" :options="masalahCabang2"/>
                                            </div>

                                            <div class="col-md-12">
                                                <b-form-group
                                                    label="Pejabat yang ber-TTD">

                                                    <model-list-select
                                                    class="col-md-12"
                                                    :list="dataPejabat"
                                                    v-model="pejabatTtdSelected"
                                                    option-value="value"
                                                    :custom-text="pejabatTtdText">
                                                    </model-list-select>
                                                </b-form-group>
                                            </div>

                                            <div class="col-md-12">
                                                <label class="form-label">Perihal</label>
                                                <b-form-input class="select" type="text" v-model="input_perihal"/>
                                            </div>

                                            <div class="col-md-12">
                                                <label class="form-label">Tujuan Unit</label>
                                                <b-form-input class="select" type="text" v-model="input_tujuanUnit"/>
                                            </div>

                                            <div class="col-md-12">
                                                <label class="form-label">Keterangan</label>
                                                <b-form-input class="select" type="text" v-model="input_keterangan"/>
                                            </div>

                                            <div class="col-md-12">
                                                <label class="form-label">No. Kode Surat</label>
                                                <b-form-input class="select" type="text" v-model="generatedKode" readonly/>
                                            </div>

                                            <div class="col-md-5">
                                                <div class="row justify-content-between">
                                                    <div class="col-tgl">
                                                        <b-form-group
                                                            label="Tanggal Keluar:"
                                                            label-for="input-tanggalKeluar">
                                                            <b-form-datepicker 
                                                                id="input-tanggalKeluar" 
                                                                v-model="input_tglKeluar" 
                                                                class="mb-2"></b-form-datepicker>
                                                        </b-form-group>
                                                    </div>
                                                    <div class="col-bln">
                                                        <b-form-group
                                                            label="Waktu Keluar:"
                                                            label-for="input-tanggalKeluar">
                                                            <b-form-timepicker
                                                                id="input-tanggalKeluar"
                                                                :hour12="false"
                                                                v-model="input_wktKeluar" 
                                                                locale="en">
                                                            </b-form-timepicker>
                                                        </b-form-group>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class="p-2">
                                                    <b-button @click="popUp2Active=false" variant="secondary">Kembali</b-button>
                                                </div>
                                                
                                                <div class="p-2" >
                                                    <b-button @click="ubahSuratKeluar" variant="success" type="submit">Ubah Surat Keluar</b-button>
                                                </div>
                                            </div>
                                        </b-form>
                                    </vs-popup>

                                    <b-button variant="danger" @click="hapusSuratKeluar(data.item._id)" size="sm">
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
    import apis from './apis.js';
    import router from '@/router';

    import * as pejabat from './dataSelect/dataPejabat.js';
    import * as ks from './dataSelect/dataKodeSurat.js';
    import * as mu from './dataSelect/dataMasalahUtama.js';

    import { ModelListSelect } from 'vue-search-select';

    import Vue from 'vue'
    import { vsPopup } from 'vuesax'
    import 'vuesax/dist/vuesax.css'

    Vue.use(vsPopup)

    export default {
        async mounted() {

            this.dataPejabat = pejabat.dataPejabatTtd;
            this.dataKodeSurat = ks.kodeSurat;
            this.dataMasalahUtama = mu.masalahUtama;

            try {
                apis.get(`/lastNoSurat`)    
                        .then((response) => {
                            this.noSuratLast =response.data[0].noSurat;
                        });
            } catch (error) {
                console.log(error);
            }

            try {
                await apis.get('/noSurat')
                .then((response) => {
                    this.suratItems = response.data;
                    let maxNoSurat= response.data.map(object => object.noSurat);
                    this.lastMaxNoSurat = Math.max(...maxNoSurat);
                });
            } catch (error) {
                console.log(error);
            }

            try {
                await apis.get('/getAllNoSurat')
                .then((response) => {

                    this.allNoSuratItems = response.data.map(object => object.noSurat);
                    let maxNoSurat = Math.max(...this.allNoSuratItems);
                    
                    this.noSuratCadangan.push('');
                    for (let i=1; i <= maxNoSurat; i++) {
                        if (!this.allNoSuratItems.includes(i)) {
                            this.noSuratCadangan.push(i)
                        }
                    }

                    if (store.state.cadanganUpdated === false) {
                        store.dispatch('setNoCadanganPrev', this.noSuratCadangan)
                        store.dispatch('setCadanganUpdatedAction', true)
                    }

                    // console.log(this.noSuratCadangan);
                });
            } catch (error) {
                console.log(error);
            }

            for (let i=1; i <= this.suratItems.length; i++) {
                this.suratItems[i-1].idx = i;
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
        
        name: 'suratMasuk',
        data() {
            return {
                nama_admin:'',
                display: 'none',
                sortBy: 'idx',
                sortDesc: true,
                popUpActive: false,
                popUp2Active: false,
                popUp3Active: false,
                errorPopUpActive: false,
                btn_display: true,
                cabang1display: false,
                cabang2display: false,
                noSuratCadanganField: false,

                noSuratCadanganSelected: null,
                noSuratSelected: null,
                noSuratLast: null,
                noSuratLastString: '',
                noSuratBeforeLast: null,
                saturdayCheck: false,
                selectedNoSuratId: '',
                lastMaxNoSurat: null,

                keyword: '',
                perPage: 8,
                currentPage: 1,
                
                dataPejabat: [],
                pejabatTtdSelected: '',

                dataKodeSurat: [],
                kodeSuratSelected: '',
                
                dataMasalahUtama: [],
                masalahUtamaSelected: '',

                masalahCabang1: '',
                masalahCabang2: '',
                masalahCabang1Selected: '',
                masalahCabang2Selected: '',

                generatedKode: '',

                input_perihal: '',
                input_tujuanUnit: '',
                input_keterangan: '',

                input_tglKeluar: '',
                input_wktKeluar: '',

                columns: [  
                    {
                        key: 'idx',
                        label: 'No',
                        sortable: true
                    },
                    {
                        key: 'noSurat',
                        label: 'Nomor Surat',
                        sortable: true,
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: 'noKodeSurat',
                        label: 'Kode Surat',
                        sortable: true,
                        thStyle: { width: "40vh"}
                    },
                    {
                        key: 'tglKeluar',
                        label: 'Tanggal Keluar',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: 'wktKeluar',
                        label: 'Tanggal Keluar',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: 'perihal',
                        label: 'Perihal',
                        thStyle: { width: "80vh"}
                    },
                    {
                        key: "tujuanUnit",
                        label: 'Tujuan Unit',
                        thStyle: { width: "20vh"}
                    },
                    {
                        key: "keterangan",
                        label: 'Keterangan',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: "opsi",
                        label: 'Opsi',
                        thStyle: { width: "10vh"}
                    }
                ],
                suratItems: [],
                noSuratCadangan: [],
                allNoSuratItems: [],

                cabangHukum: [
                    {value: 'HK.100', text: "Peraturan Non perusahaan"},
                    {value: 'HK.200', text: "Peraturan Perusahaan"},
                    {value: 'HK.0', text: "PERDATA"},
                ],
                
                cabangDapenInves: [
                    {value: 'IN.100', text: "Investasi Langsung"},
                    {value: 'IN.110', text: "Properti"},
                    {value: 'IN.120', text: "Penyertaan Saham"},
                    {value: 'IN.130', text: "INvestasi Lainnya"},
                ],

                dataHK100: [
                    {value: 'HK.110', text: "Peraturan Lembaga"},
                    {value: 'HK.120', text: "Peraturan Departemen"},
                    {value: 'HK.130', text: "Peraturan Non Departemen"},
                ],
            }
        },

        computed: {
            // For pagination
            rows() {
                return this.suratItems.length
            },
        },

        methods: {

            pejabatTtdText(item) {
                return `${item.value} - ${item.text} - ${item.desc}`
            },

            umumChange(event) {
                this.cabang1display = true
                this.ubahGenerateKodeDisplay = true

                if (event === 'hukum') {
                    this.masalahCabang1 = this.cabangHukum
                } else if (event === 'dapenInves' ) {
                    this.masalahCabang1 = this.cabangDapenInves
                } else {
                    this.masalahCabang1 = ''
                }
            },

            cabang1Change(event) {
                this.cabang2display = true
                if (event === 'HK.100') {
                    this.masalahCabang2 = this.dataHK100
                } else {
                    this.masalahCabang2 = ''
                }
            },

            cabang2Change(event) {
                console.log(this.masalahCabang2Selected);
            },

            logout() {
                store.dispatch('logoutAction')
            },

            async tambahSuratKeluar() {
                const today = new Date();

                if (
                    this.kodeSuratSelected === ''
                    || this.pejabatTtdSelected === ''
                    || this.masalahUtamaSelected === ''
                    || this.masalahCabang1Selected === ''
                    || this.masalahCabang2Selected === ''
                    || this.input_perihal === ''
                    || this.input_tujuanUnit === ''
                    || this.input_keterangan === ''
                    || this.input_tglKeluar === ''
                    || this.input_wktKeluar === '' 
                    ) {
                        this.errorPopUpActive = true;
                    } else if (this.noSuratCadanganField === false && this.noSuratCadanganSelected === null) { 
                        this.errorPopUpActive = true;
                    } else {

                    // Check the last noSurat written in last database record
                    try {
                        await apis.get(`/lastNoSurat`)
                        .then((response) => {
                            this.noSuratLast = response.data[0].noSurat;
                            this.noSuratBeforeLast = response.data[1].noSurat;
                            console.log(this.noSuratLast, this.noSuratBeforeLast);
                        });
                    } catch (error) {
                            console.log(error);
                    }

                    // If user doesn't use the "nomor surat cadangan"
                    if (this.noSuratCadanganField === 'true') {

                        this.noSuratCadanganSelected = null
                        // Condition to continue increasing noSurat number
                        if (this.noSuratLast !== this.lastMaxNoSurat) {
                            this.noSuratLast = this.lastMaxNoSurat;
                        }

                        if (this.noSuratLast === null || this.noSuratLast === 0) {
                            this.noSuratLast = 1
                        } else {
                            if (today.getDay() === 1 && store.state.saturdayCheck === false) {
                                // console.log('Today is sunday and false');

                                store.dispatch('setSaturdayCheckAction', true)
                                this.noSuratLast += 10;
                                store.dispatch('setCadanganUpdatedAction', false)

                            } else if (today.getDay() === 1 && store.state.saturdayCheck === true) {
                                // console.log('Today is sunday and true');

                                if (this.noSuratLast === this.noSuratBeforeLast + 10 || this.noSuratLast === this.noSuratBeforeLast + 1) {
                                    this.noSuratLast++
                                } else if (this.noSuratLast === this.lastMaxNoSurat){
                                    this.noSuratLast++;
                                } else {
                                    this.noSuratLast += 10;
                                    store.dispatch('setCadanganUpdatedAction', false)
                                }
                            } else if (today.getDay() !== 1) {
                                // console.log('Today is not sunday');

                                store.dispatch('setSaturdayCheckAction', false)
                                this.noSuratLast++
                            } else if (store.state.noSuratCadanganPrev.includes(this.noSuratBeforeLast)) {
                                console.log("TURU");
                                this.noSuratLast++
                            }
                        }

                    // If user use the "nomor surat cadangan"
                    } else if (this.noSuratCadanganField === false) {
                        this.noSuratLast = this.noSuratCadanganSelected
                    }

                    this.noSuratLastString = this.noSuratLast.toString()
                    // console.log('len ', this.noSuratLastString.length);

                    // // Formatting the noSuratLast
                    if (this.noSuratLastString.length === 1) {
                        this.noSuratLastString = '00' + this.noSuratLastString;
                    } else if (this.noSuratLastString.length === 2) {
                        this.noSuratLastString = '0' + this.noSuratLastString;
                    } else if (this.noSuratLastString.length === 3) {
                        this.noSuratLastString = this.noSuratLastString;
                    }

                    this.generatedKode = `${this.kodeSuratSelected} ${this.noSuratLastString}/${this.masalahCabang2Selected}/${this.pejabatTtdSelected}/REG4/${today.getFullYear()}`

                    // Save the data to MongoDB 
                    try {
                        await apis.post
                        (
                            '/noSurat', 
                            { 
                                idx: '',
                                noSurat: this.noSuratLast,
                                noKodeSurat: this.generatedKode,
                                kodeSurat: this.kodeSuratSelected,
                                masalahUtama: this.masalahUtamaSelected,
                                masalahCabang1: this.masalahCabang1Selected,
                                masalahCabang2: this.masalahCabang2Selected,
                                pejabatTtd: this.pejabatTtdSelected,
                                tglKeluar: this.input_tglKeluar,
                                wktKeluar: this.input_wktKeluar,
                                perihal: this.input_perihal,
                                tujuanUnit: this.input_tujuanUnit,
                                keterangan: this.input_keterangan
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
                
            async hapusSuratKeluar(id) {
                this.selectedSuratId = id;

                try {
                    await apis.delete(`/noSurat/${id}`);
                } catch (error) {
                    console.log(error)
                }

                this.$router.go();
            },

            // lihatClick(id) {
            //     this.selectedSuratId = id;
            //     // console.log(this.selectedSuratId);
            //     try {
            //         apis.get
            //         (
            //             `/surat/${this.selectedSuratId}`,
            //         )
            //         .then(response => {
            //             const params = response.data
            //             this.generatedKode = params.noKodeSurat
            //             this.input_tglKeluar = params.tglKeluar,
            //             this.input_wktKeluar = params.wktKeluar,
            //             this.input_perihal = params.perihal,
            //             this.input_tujuanUnit = params.tujuanUnit,
            //             this.input_keterangan = params.keterangan
            //         })
            //     } catch (error) {
            //         console.log(error)
            //     }
            //     this.popUp3Active = true;
            // },

            ubahClick(id) {
                this.selectedNoSuratId = id;
                // console.log(this.selectedSuratId);
                try {
                    apis.get
                    (
                        `/noSurat/${this.selectedNoSuratId}`,
                    )
                    .then(response => {
                        const params = response.data
                        this.noSuratSelected = params.noSurat
                        this.generatedKode = params.noKodeSurat
                        this.kodeSuratSelected = params.kodeSurat
                        this.masalahUtamaSelected = params.masalahUtama
                        this.masalahCabang1Selected = params.masalahCabang1
                        this.masalahCabang2Selected = params.masalahCabang2
                        this.pejabatTtdSelected = params.pejabatTtd
                        this.input_tglKeluar = params.tglKeluar
                        this.input_wktKeluar = params.wktKeluar
                        this.input_perihal = params.perihal
                        this.input_tujuanUnit = params.tujuanUnit
                        this.input_keterangan = params.keterangan
                    })
                } catch (error) {
                    console.log(error)
                }
                this.popUp2Active = true;
            },

            async ubahSuratKeluar() {
                const today = new Date();
                const params = this.selectedNoSuratId
                this.generatedKode = `${this.kodeSuratSelected} ${this.noSuratSelected}/${this.masalahCabang2Selected}/${this.pejabatTtdSelected}/REG4/${today.getFullYear()}`

                try {
                    await apis.patch
                    (
                        `/noSurat/${this.selectedNoSuratId}`, 
                        { 
                            idx: '',
                            noSurat: this.noSuratSelected,
                            noKodeSurat: this.generatedKode,
                            kodeSurat: this.kodeSuratSelected,
                            masalahUtama: this.masalahUtamaSelected,
                            masalahCabang1: this.masalahCabang1Selected,
                            masalahCabang2: this.masalahCabang2Selected,
                            pejabatTtd: this.pejabatTtdSelected,
                            tglKeluar: this.input_tglKeluar,
                            wktKeluar: this.input_wktKeluar,
                            perihal: this.input_perihal,
                            tujuanUnit: this.input_tujuanUnit,
                            keterangan: this.input_keterangan
                        },
                        { headers: { 'Content-Type': 'application/json' } }
                    )
                    this.popUp2Active = false
                    router.go(0)
                } catch (error) {
                    console.log(error)
                }
            },
        },

        components: {
            ModelListSelect,
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