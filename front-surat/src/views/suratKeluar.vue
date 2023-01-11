<template>
    <div>
        <navigation></navigation>
        <div class="body body-padding-top">
            <div class="user-wrapper">

                <div class="table-wrapper">
                    <div class="page-title">
                        <h5>Surat Keluar</h5>
                    </div>

                    <div class="d-flex">
                        <div class="nav-2">
                            <b-button @click="$router.go(-1)" variant="secondary">
                                <b-icon icon="arrow-left"></b-icon>
                                Kembali
                            </b-button>
                        </div>
                        <div class="nav-2">
                            <b-button @click="klikTambahSuratKeluar()" variant="success">
                                <b-icon icon="envelope-open"></b-icon>
                                Tambah Surat Keluar
                            </b-button>
                        </div>

                        <vs-popup class="holamundo"  title="Tambah Surat Keluar" :active.sync="popUpActive" v-if="popUpActive" style="position: absolute; z-index: 98;">
                            <b-form autoComplete="off" class="b-form-custom">

                                <div :style="{ display }">
                                    <label class="form-label">No Surat Cadangan</label>
                                    <b-form-select :disabled="noSuratCadanganField"  class="select form-select" v-model="noSuratCadanganSelected" :options="noSuratCadangan"></b-form-select>
                                    
                                    <b-form-checkbox
                                        name="useNoSuratCadangan"
                                        v-model="noSuratCadanganField"
                                        value=true
                                        size="md">
                                        Tidak Pakai Nomor Cadangan
                                    </b-form-checkbox>
                                </div>

                                <div>
                                    <label class="form-label">Kode Surat</label>
                                    <b-form-select class="select form-select" v-model="kodeSuratSelected" :options="dataKodeSurat"/>
                                </div>

                                <div>
                                    <label class="form-label">Klasifikasi Masalah Utama</label>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <b-form-input readonly class="select" style="width: 100%; margin: 0;" type="text" v-model="masalahUtamaSelected"/>
                                        </div>
                                        <div class="align-self-center">
                                            <b-button @click="popUpMasalah=true" variant="primary">
                                                <b-icon icon="journal-bookmark"></b-icon>
                                                Klarifikasi Masalah
                                            </b-button>
                                        </div>
                                    </div>

                                    <vs-popup 
                                    class="holamundo" 
                                    title="Klarifikasi Masalah" 
                                    :active.sync="popUpMasalah" 
                                    v-if="popUpMasalah" 
                                    style="position: absolute; z-index: 99;"
                                    >

                                    <b-card style="height: 500px; overflow-y: auto;" v-if="popUpMasalah">
                                        <div style="display: flex; flex-direction: column; gap: 10px;">
                        
                                            <div v-for="masalah in dataMasalahJSON">
                                                <div style="display: flex; flex-direction: row; gap: 10px;">
                                                    <b-button variant="primary" @click="cabangClick=true" v-b-toggle="masalah.value" size="sm">
                                                        <b-icon icon="chevron-down"></b-icon>
                                                    </b-button>
                                                    <b-button @click="selectMasalahUmum(masalah.value)" size="sm" variant="primary">{{masalah.value}} {{masalah.text}}</b-button>
                                                </div>

                                                <b-collapse :id="masalah.value" class="mt-2">
                                                <b-card size="sm" style="margin-bottom: 20px;">{{masalah.desc}}</b-card>
                                                    <div style="margin-left: 10px; display: flex; flex-direction: column; gap: 10px" v-if="cabangClick">
                                                        <div v-for="cabang in masalah.child">
                                                            <div style="display: flex; flex-direction: row; gap: 10px; margin-bottom: 5px;">
                                                                <b-button variant="primary" @click="cabang2Click=true" v-b-toggle="cabang.value" size="sm" >
                                                                    <b-icon icon="chevron-down"></b-icon>
                                                                </b-button>
                                                                <b-button @click="selectMasalahUmum(cabang.value)" size="sm" variant="warning">{{cabang.value}} {{cabang.text}}</b-button>
                                                            </div>
                                                            <b-card size="sm">{{cabang.desc}}</b-card>

                                                            <b-collapse :id="cabang.value" class="mt-2">
                                                                <div style="margin-left: 10px; display: flex; flex-direction: column;" v-if="cabang2Click">
                                                                    <div v-for="cabang2 in cabang.child2" style="margin-top: 8px;">
                                                                            <b-button variant="success" @click="selectMasalahUmum(cabang2.value)" size="sm" style="margin: 5px 0;">{{cabang2.value}} {{cabang2.text}}</b-button>
                                                                            <b-card size="sm">{{cabang2.desc}}</b-card>
                                                                    </div>
                                                                </div>
                                                            </b-collapse>
                        
                                                        </div>
                                                    </div>
                        
                                                </b-collapse>
                                            </div>
                                        </div>
                                    </b-card>

                                    <b-button @click="popUpMasalah=false" variant="secondary" style="margin-top: 13px;">
                                        <b-icon icon="arrow-left"></b-icon>
                                        Kembali
                                    </b-button>
                                    </vs-popup>
                                </div>

                                <div>
                                    <label class="form-label">Pejabat yang bet-TTD</label>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <b-form-input readonly class="select" style="width: 100%; margin: 0;" type="text" v-model="pejabatTtdSelected"/>
                                        </div>
                                        <div class="align-self-center">
                                            <b-button @click="popUpPejabatTtd=true" variant="primary">
                                                <b-icon icon="people-fill"></b-icon>
                                                Pejabat yg ber-TTD
                                            </b-button>
                                        </div>
                                    </div>

                                    <vs-popup 
                                    icon="people-fill"
                                    title="Pejabat yang ber-TTd" 
                                    :active.sync="popUpPejabatTtd"
                                    v-if="popUpPejabatTtd"
                                    style="position: absolute; z-index: 99;"
                                    >
                            
                                    <b-card style="height: 500px; overflow-y: auto;" v-if="popUpPejabatTtd">
                                            <div style="display: flex; flex-direction: column; gap: 10px;">
                            
                                                <div v-for="pejabat in dataPejabatJSON">
                                                    <b-button size="sm" variant="primary" @click="cabangClick=true" v-b-toggle="pejabat.value">{{pejabat.text}}</b-button>
                                                    
                                                    <b-collapse :id="pejabat.value" class="mt-2">

                                                        <div style="margin-left: 10px; display: flex; flex-direction: column; gap: 10px" v-if="cabangClick">
                                                            <template v-for="cabang in pejabat.child">

                                                                <div style="display: flex; flex-direction: row; gap: 10px">
                                                                    <b-button variant="primary" @click="cabang2Click=true" v-b-toggle="cabang.value" size="sm">
                                                                        <b-icon icon="chevron-down"></b-icon>
                                                                    </b-button>
                                                                    <b-button @click="selectPejabatTtd(cabang.value, cabang.desc)" size="sm" variant="warning">{{cabang.value}}</b-button>
                                                                </div>

                                                                <b-card style="margin-left: 45px;" size="sm">{{cabang.desc}}</b-card>

                                                                <b-collapse :id="cabang.value" class="mt-2">
                                                                    <div style="margin-left: 10px; display: flex; flex-direction: column; gap: 10px" v-if="cabang2Click">
                                                                        <template v-for="cabang2 in cabang.child2">
                                                                        
                                                                            <div style="display: flex; flex-direction: row; gap: 10px">
                                                                                <b-button variant="primary"  @click="cabang3Click=true" v-b-toggle="cabang2.value" size="sm">
                                                                                    <b-icon icon="chevron-down"></b-icon>
                                                                                </b-button>
                                                                                <b-button variant="success" @click="selectPejabatTtd(cabang2.value, cabang2.desc)" size="sm">{{cabang2.value}}</b-button>
                                                                            </div>
                                                                            
                                                                                <b-card style="margin-left: 46px;" size="sm">{{cabang2.desc}}</b-card>
                                                                            
                                                                            <b-collapse :id="cabang2.value" class="mt-2">
                                                                                <div style="margin-left: 55px; display: flex; flex-direction: column; gap: 10px" v-if="cabang3Click">
                                                                                    <template v-for="cabang3 in cabang2.child3">
                                                                                        <div style="display: flex; flex-direction: row; gap: 10px">
                                                                                            <b-button variant="success" @click="selectPejabatTtd(cabang3.value, cabang3.desc)" size="sm">{{cabang3.value}}</b-button>
                                                                                        </div>
                                                                                        
                                                                                        <b-card size="sm">{{cabang3.desc}}</b-card>
                                                                                    </template>
                                                                                </div>
                                                                            </b-collapse>
                                                                        </template>
                                                                    </div>
                                                                </b-collapse>
                            
                                                            </template>
                                                        </div>
                            
                                                    </b-collapse>
                                                </div>
                                            </div>
                                    </b-card>
                                    <b-button @click="popUpPejabatTtd=false" variant="secondary" style="margin-top: 13px;">
                                        <b-icon icon="arrow-left"></b-icon>
                                        Kembali
                                    </b-button>
                                    </vs-popup>
                                </div>
                                
                                <div>
                                    <label class="form-label">Perihal</label>
                                    <b-form-input type="text" v-model="input_perihal"/>
                                </div>

                                <div>
                                    <label class="form-label">Tujuan Unit</label>
                                    <b-form-input type="text" v-model="input_tujuanUnit"/>
                                </div>

                                <b-form-group>
                                    <div class="d-flex justify-content-between">
                                        <b-form-group
                                            label="Tanggal Keluar"
                                            v-if="dpickerSAdmin">
                                            <el-date-picker
                                                v-model="input_tglKeluar"
                                                type="date"
                                                placeholder="Pilih Tanggal keluar"
                                                format="dd/MM/yyyy"
                                                value-format="dd-MM-yyyy">
                                            </el-date-picker>
                                        </b-form-group>
                                        
                                        <b-form-group
                                            label="Tanggal Keluar"
                                            v-if="dpickerAdmin">
                                            <el-date-picker
                                                v-model="input_tglKeluar"
                                                type="date"
                                                :picker-options="pickerOptions"
                                                placeholder="Pilih Tanggal keluar"
                                                format="dd/MM/yyyy"
                                                value-format="dd-MM-yyyy">
                                            </el-date-picker>
                                        </b-form-group>

                                        <b-form-group
                                            label="Waktu Keluar">
                                            <el-time-picker
                                                v-model="input_wktKeluar"
                                                placeholder="Pilih Waktu Keluar"
                                                format="HH:mm"
                                                value-format="HH:mm">
                                            </el-time-picker>
                                        </b-form-group>
                                    </div>
                                </b-form-group>

                                <vs-popup class="holamundo"  title="Error!" :active.sync="errorPopUpActive" v-if="errorPopUpActive">
                                    <p>Ada beberapa field yang belum terisi. <br> Harap lengkapi data terlebih dahulu!</p><br>
                                    <b-button @click="errorPopUpActive=false" variant="danger">Mengerti</b-button>
                                </vs-popup>

                                <b-form-group>
                                    <div class="d-flex justify-content-between">
                                        <div class="nav-2">
                                            <b-button @click="popUpActive=false" variant="secondary">
                                                <b-icon icon="arrow-left"></b-icon>
                                                Kembali
                                            </b-button>
                                        </div>
                                        <div class="nav-2" style="padding-right: 0;">
                                            <b-button @click="tambahSuratKeluar()" variant="success">
                                                <b-icon icon="save"></b-icon>
                                                Simpan Data
                                            </b-button>
                                        </div>
                                    </div>
                                </b-form-group>

                            </b-form>
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

                                    <vs-popup 
                                        class="holamundo"  
                                        title="Edit Surat Keluar" 
                                        :active.sync="popUp2Active" 
                                        v-if="popUp2Active" 
                                        style="position: absolute; z-index: 98;"
                                    >
                                        <b-form autocomplete="off" class="b-form-custom">

                                            <b-form-group>
                                                <label class="form-label">Kode Surat</label>
                                                <b-form-select class="select form-select" v-model="kodeSuratSelected" :options="dataKodeSurat"/>
                                            </b-form-group>

                                            <b-form-group>
                                                <label class="form-label">Klasifikasi Masalah Utama</label>
                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        <b-form-input readonly class="select" style="width: 100%; margin: 0;" type="text" v-model="masalahUtamaSelected"/>
                                                    </div>
                                                    <div class="align-self-center">
                                                        <b-button @click="popUpMasalah=true" variant="primary">
                                                            <b-icon icon="journal-bookmark"></b-icon>
                                                            Klarifikasi Masalah
                                                        </b-button>
                                                    </div>
                                                </div>

                                                <vs-popup 
                                                    class="holamundo" 
                                                    title="Klarifikasi Masalah" 
                                                    :active.sync="popUpMasalah" 
                                                    v-if="popUpMasalah" 
                                                    style="position: absolute; z-index: 99;"
                                                    >

                                                    <b-card style="height: 500px; overflow-y: auto;" v-if="popUpMasalah">
                                                        <div style="display: flex; flex-direction: column; gap: 10px;">
                                        
                                                            <div v-for="masalah in dataMasalahJSON">
                                                                <div style="display: flex; flex-direction: row; gap: 10px;">
                                                                    <b-button variant="primary" @click="cabangClick=true" v-b-toggle="masalah.value" size="sm">
                                                                        <b-icon icon="chevron-down"></b-icon>
                                                                    </b-button>
                                                                    <b-button @click="selectMasalahUmum(masalah.value)" size="sm" variant="primary">{{masalah.value}} {{masalah.text}}</b-button>
                                                                </div>

                                                                <b-collapse :id="masalah.value" class="mt-2">
                                                                <b-card size="sm" style="margin-bottom: 20px;">{{masalah.desc}}</b-card>
                                                                    <div style="margin-left: 10px; display: flex; flex-direction: column; gap: 10px" v-if="cabangClick">
                                                                        <div v-for="cabang in masalah.child">
                                                                            <div style="display: flex; flex-direction: row; gap: 10px; margin-bottom: 5px;">
                                                                                <b-button variant="primary" @click="cabang2Click=true" v-b-toggle="cabang.value" size="sm" >
                                                                                    <b-icon icon="chevron-down"></b-icon>
                                                                                </b-button>
                                                                                <b-button @click="selectMasalahUmum(cabang.value)" size="sm" variant="warning">{{cabang.value}} {{cabang.text}}</b-button>
                                                                            </div>
                                                                            <b-card size="sm">{{cabang.desc}}</b-card>

                                                                            <b-collapse :id="cabang.value" class="mt-2">
                                                                                <div style="margin-left: 10px; display: flex; flex-direction: column;" v-if="cabang2Click">
                                                                                    <div v-for="cabang2 in cabang.child2" style="margin-top: 8px;">
                                                                                            <b-button variant="success" @click="selectMasalahUmum(cabang2.value)" size="sm" style="margin: 5px 0;">{{cabang2.value}} {{cabang2.text}}</b-button>
                                                                                            <b-card size="sm">{{cabang2.desc}}</b-card>
                                                                                    </div>
                                                                                </div>
                                                                            </b-collapse>
                                        
                                                                        </div>
                                                                    </div>
                                        
                                                                </b-collapse>
                                                            </div>
                                                        </div>
                                                    </b-card>

                                                    <b-button @click="popUpMasalah=false" variant="secondary" style="margin-top: 13px;">
                                                        <b-icon icon="arrow-left"></b-icon>
                                                        Kembali
                                                    </b-button>
                                                </vs-popup>
                                            </b-form-group>

                                            <b-form-group>
                                                <label class="form-label">Pejabat yang bet-TTD</label>
                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        <b-form-input readonly class="select" style="width: 100%; margin: 0;" type="text" v-model="pejabatTtdSelected"/>
                                                    </div>
                                                    <div class="align-self-center">
                                                        <b-button @click="popUpPejabatTtd=true" variant="primary">
                                                            <b-icon icon="people-fill"></b-icon>
                                                            Pejabat yg ber-TTD
                                                        </b-button>
                                                    </div>
                                                </div>
                                                
                                                <vs-popup 
                                                    icon="people-fill"
                                                    title="Pejabat yang ber-TTd" 
                                                    :active.sync="popUpPejabatTtd"
                                                    v-if="popUpPejabatTtd"
                                                    style="position: absolute; z-index: 99;"
                                                    >
                                            
                                                    <b-card style="height: 500px; overflow-y: auto;" v-if="popUpPejabatTtd">
                                                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                            
                                                                <div v-for="pejabat in dataPejabatJSON">
                                                                    <b-button size="sm" variant="primary" @click="cabangClick=true" v-b-toggle="pejabat.value">{{pejabat.text}}</b-button>
                                                                    
                                                                    <b-collapse :id="pejabat.value" class="mt-2">

                                                                        <div style="margin-left: 10px; display: flex; flex-direction: column; gap: 10px" v-if="cabangClick">
                                                                            <template v-for="cabang in pejabat.child">

                                                                                <div style="display: flex; flex-direction: row; gap: 10px">
                                                                                    <b-button variant="primary" @click="cabang2Click=true" v-b-toggle="cabang.value" size="sm">
                                                                                        <b-icon icon="chevron-down"></b-icon>
                                                                                    </b-button>
                                                                                    <b-button @click="selectPejabatTtd(cabang.value, cabang.desc)" size="sm" variant="warning">{{cabang.value}}</b-button>
                                                                                </div>

                                                                                <b-card style="margin-left: 45px;" size="sm">{{cabang.desc}}</b-card>

                                                                                <b-collapse :id="cabang.value" class="mt-2">
                                                                                    <div style="margin-left: 10px; display: flex; flex-direction: column; gap: 10px" v-if="cabang2Click">
                                                                                        <template v-for="cabang2 in cabang.child2">
                                                                                        
                                                                                            <div style="display: flex; flex-direction: row; gap: 10px">
                                                                                                <b-button variant="primary"  @click="cabang3Click=true" v-b-toggle="cabang2.value" size="sm">
                                                                                                    <b-icon icon="chevron-down"></b-icon>
                                                                                                </b-button>
                                                                                                <b-button variant="success" @click="selectPejabatTtd(cabang2.value, cabang.desc)" size="sm">{{cabang2.value}}</b-button>
                                                                                            </div>
                                                                                            
                                                                                                <b-card style="margin-left: 46px;" size="sm">{{cabang2.desc}}</b-card>
                                                                                            
                                                                                            <b-collapse :id="cabang2.value" class="mt-2">
                                                                                                <div style="margin-left: 55px; display: flex; flex-direction: column; gap: 10px" v-if="cabang3Click">
                                                                                                    <template v-for="cabang3 in cabang2.child3">
                                                                                                        <div style="display: flex; flex-direction: row; gap: 10px">
                                                                                                            <b-button variant="success" @click="selectPejabatTtd(cabang3.value, cabang3.desc)" size="sm">{{cabang3.value}}</b-button>
                                                                                                        </div>
                                                                                                        
                                                                                                        <b-card size="sm">{{cabang3.desc}}</b-card>
                                                                                                    </template>
                                                                                                </div>
                                                                                            </b-collapse>
                                                                                        </template>
                                                                                    </div>
                                                                                </b-collapse>
                                            
                                                                            </template>
                                                                        </div>
                                            
                                                                    </b-collapse>
                                                                </div>
                                                            </div>
                                                    </b-card>
                                                    <b-button @click="popUpPejabatTtd=false" variant="secondary" style="margin-top: 13px;">
                                                        <b-icon icon="arrow-left"></b-icon>
                                                        Kembali
                                                    </b-button>
                                                </vs-popup>
                                            </b-form-group>
                                            
                                            <b-form-group>
                                                <label class="form-label">No. Kode Surat</label>
                                                <b-form-input class="select" type="text" v-model="generatedKode" readonly/>
                                            </b-form-group>

                                            <b-form-group>
                                                <label class="form-label">Perihal</label>
                                                <b-form-input class="select" type="text" v-model="input_perihal"/>
                                            </b-form-group>

                                            <b-form-group>
                                                <label class="form-label">Tujuan Unit</label>
                                                <b-form-input class="select" type="text" v-model="input_tujuanUnit"/>
                                            </b-form-group>

                                            <b-form-group>
                                                <div class="d-flex justify-content-between">
                                                    <b-form-group
                                                        label="Tanggal Keluar"
                                                        v-if="dpickerSAdmin">
                                                        <el-date-picker
                                                            v-model="input_tglKeluar"
                                                            type="date"
                                                            placeholder="Pilih Tanggal keluar"
                                                            format="dd/MM/yyyy"
                                                            value-format="dd-MM-yyyy">
                                                        </el-date-picker>
                                                    </b-form-group>
                                                    
                                                    <b-form-group
                                                        label="Tanggal Keluar"
                                                        v-if="dpickerAdmin">
                                                        <el-date-picker
                                                            v-model="input_tglKeluar"
                                                            type="date"
                                                            :picker-options="pickerOptions"
                                                            placeholder="Pilih Tanggal keluar"
                                                            format="dd/MM/yyyy"
                                                            value-format="dd-MM-yyyy">
                                                        </el-date-picker>
                                                    </b-form-group>

                                                    <b-form-group
                                                        label="Waktu Keluar">
                                                        <el-time-picker
                                                            v-model="input_wktKeluar"
                                                            placeholder="Pilih Waktu Keluar"
                                                            format="HH:mm"
                                                            value-format="HH:mm">
                                                        </el-time-picker>
                                                    </b-form-group>
                                                </div>
                                            </b-form-group>

                                            <vs-popup class="holamundo"  title="Error!" :active.sync="errorPopUpActive">
                                                <p>Ada beberapa field yang belum terisi. <br> Harap lengkapi data terlebih dahulu!</p><br>
                                                <b-button @click="errorPopUpActive=false" variant="danger">Mengerti</b-button>
                                            </vs-popup>

                                            <div class="d-flex justify-content-between">
                                                <div class="nav-2">
                                                    <b-button @click="popUp2Active=false" variant="secondary">
                                                    <b-icon icon="arrow-left"></b-icon>
                                                        Kembali
                                                    </b-button>
                                                </div>
                                                
                                                <div class="nav-2" style="padding-right: 0;">
                                                    <b-button @click="ubahSuratKeluar" variant="success">
                                                        <b-icon icon="pencil-square"></b-icon>
                                                        Ubah Surat Keluar
                                                    </b-button>
                                                </div>
                                            </div>
                                        </b-form>
                                    </vs-popup>

                                    <vs-popup class="holamundo"  title="Konfirmasi Penghapusan Surat Keluar" :active.sync="popUpDelete" v-if="popUpDelete">
                                        <p>Yakin ingin <b>menghapus</b> surat keluar ini?</p>
                                        <div class="d-flex justify-content-between" style="margin-top: 20px;">
                                            <div class="nav-2">
                                                <b-button @click="popUpDelete=false" variant="secondary">
                                                    <b-icon icon="arrow-left"></b-icon>
                                                    Kembali
                                                </b-button>
                                            </div>

                                            <div class="nav-2" style="padding-right: 0;">
                                                <b-button @click="hapusSuratKeluar(data.item._id)" variant="danger" type="submit">
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

    import navigation from './nav.vue';
    import customFooter from './footer.vue';

    import store from '/src/store';
    import apis from './apis.js';
    import router from '@/router';

    import * as ks from './dataSelect/dataKodeSurat.js';
    import * as masalahjson from './dataSelect/dataCabang/masalahJSON.js';
    import * as pejabatjson from './dataSelect/dataCabang/pejabatJSON.js';
    
    import Vue from 'vue'
    import { vsPopup } from 'vuesax'
    Vue.use(vsPopup)

    import ElementUI from 'element-ui'
    import locale from 'element-ui/lib/locale/lang/en'
    Vue.use(ElementUI, { locale })

    export default {

        async created() {

            try {
                await apis.get(`/user/${store.state.id}`)
                .then((response) => {
                    this.nama_admin = response.data.nama
                    let role_admin = response.data.role

                    if (role_admin === 'super_admin') {
                        this.dpickerSAdmin = true
                        this.dpickerAdmin = false
                    } else if (role_admin === 'admin' || role_admin === 'secret') {
                        this.dpickerSAdmin = false
                        this.dpickerAdmin = true
                    }
                });
            } catch (error) {
                console.log(error);
            }
        
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

                    if (this.suratItems.length === 0) {
                        this.lastMaxNoSurat = 0;
                    } else {
                        let maxNoSurat= response.data.map(object => object.noSurat);
                        this.lastMaxNoSurat = Math.max(...maxNoSurat);
                    }
                });
            } catch (error) {
                console.log(error);
            }

            for (let i=1; i <= this.suratItems.length; i++) {
                this.suratItems[i-1].idx = i;
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
        },

        mounted() {
            this.dataKodeSurat = ks.kodeSurat;
            this.dataMasalahJSON = masalahjson.default.data;
            this.dataPejabatJSON = pejabatjson.default.data;

            if (store.state.role === 'super_admin') {
                this.display = 'block'
            } else {
                this.display = 'none'
            }
        },
        
        name: 'suratKeluar',
        data() {

            return {

                // Disabled all date before today
                pickerOptions: {
                    disabledDate (time) {
                        const previous = new Date();
                        previous.setDate(previous.getDate() - 1);
                        return time.getTime() < previous;
                    },
                },

                nama_admin: '',
                dpickerAdmin: false,
                dpickerSAdmin: false,

                display: false,
                sortBy: 'idx',
                sortDesc: true,
                popUpActive: false,
                popUp2Active: false,
                popUp3Active: false,
                errorPopUpActive: false,
                popUpDelete: false,
                btn_display: true,
                cabangClick: false,
                cabang2Click: false,
                cabang3Click: false,

                noSuratCadanganField: false,

                popUpMasalah: false,
                popUpPejabatTtd: false,

                noSuratCadanganSelected: null,
                noSuratSelected: null,
                noSuratLast: null,
                noSuratLastString: '',
                noSuratBeforeLast: null,
                saturdayCheck: false,
                selectedNoSuratId: '',
                lastMaxNoSurat: null,
                isNoSaturdayCheck: false,

                keyword: '',
                perPage: 15,
                currentPage: 1,

                suratItems: [],
                noSuratCadangan: [],
                allNoSuratItems: [],
                
                dataPejabatJSON: {},
                pejabatTtdSelected: '',
                pejabatDescSelected: '',

                dataKodeSurat: [],
                kodeSuratSelected: '',
                
                dataMasalahJSON: {},
                masalahUtamaSelected: '',

                generatedKode: '',

                input_perihal: '',
                input_tujuanUnit: '',
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
                        label: 'Waktu Keluar',
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
                        key: "pejabatDesc",
                        label: 'Pejabat Ttd',
                        thStyle: { width: "20vh"}
                    },
                    {
                        key: "pembuatSurat",
                        label: 'Pembuat Surat',
                        thStyle: { width: "30vh"}
                    },
                    {
                        key: "opsi",
                        label: 'Opsi',
                        thStyle: { width: "10vh"}
                    }
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

            selectMasalahUmum(value) {
                this.masalahUtamaSelected = value;
                this.popUpMasalah = false
            },
            
            selectPejabatTtd(value, text) {
                this.pejabatTtdSelected = value;
                this.pejabatDescSelected = text;
                this.popUpPejabatTtd = false
            },

            pejabatTtdText(item) {
                return `${item.value} - ${item.text} - ${item.desc}`
            },

            logout() {
                store.dispatch('logoutAction')
            },

            klikTambahSuratKeluar() {

                this.kodeSuratSelected = ''
                this.pejabatTtdSelected = ''
                this.masalahUtamaSelected = ''
                this.input_perihal = ''
                this.input_tujuanUnit = ''
                this.input_tglKeluar = ''
                this.input_wktKeluar = ''
                this.popUpActive=true
            },

            async tambahSuratKeluar() {
                const today = new Date();

                if (
                    this.pejabatTtdSelected === ''
                    || this.masalahUtamaSelected === ''
                    || this.input_perihal === ''
                    || this.input_tujuanUnit === ''
                    || this.input_tglKeluar === ''
                    || this.input_wktKeluar === '' 
                    ) {
                        this.errorPopUpActive = true;
                    } else if (
                        store.state.role === 'super_admin' 
                    && this.noSuratCadanganField === false 
                    && this.noSuratCadanganSelected === null) { 
                        this.errorPopUpActive = true;
                    } else {

                        if (this.suratItems.length !== 0) {
                            // Check the last noSurat written in last database record
                            try {
                                await apis.get(`/lastNoSurat`)
                                .then((response) => {

                                    if (response.data.length <= 1) {
                                        this.noSuratLast = response.data[0].noSurat;
                                        this.noSuratBeforeLast = 0;
                                    } else {
                                        this.noSuratLast = response.data[0].noSurat;
                                        this.noSuratBeforeLast = response.data[1].noSurat;
                                    }

                                });
                            } catch (error) {
                                console.log(error);
                            }
                        }

                        if (store.state.role === 'super_admin') {

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
                                    // Change the namber at "today.getDay() === 2"
                                    // Also change at the next if else for "store.state.role === 'admin'"
                                    // If you want to change the day that trigger noSuratLast + 20
                                    if (today.getDay() === 5 && store.state.saturdayCheck === false) {
                                        // console.log('Today is friday and false');
                                        
                                        store.dispatch('setSaturdayCheckAction', true)
                                        this.noSuratLast += 20;
                                        this.isNoSaturdayCheck = true;
                                        store.dispatch('setCadanganUpdatedAction', false)

                                    // Don't forget to also change the number here as before
                                    } else if (today.getDay() === 5 && store.state.saturdayCheck === true) {

                                        // console.log('Today is firday and true');

                                        if (this.noSuratLast === this.noSuratBeforeLast + 20 || this.noSuratLast === this.noSuratBeforeLast + 1 || this.noSuratBeforeLast === 0) {
                                            this.noSuratLast++
                                        } else if (this.noSuratLast === this.lastMaxNoSurat){
                                            this.noSuratLast++;
                                        } else {
                                            this.noSuratLast += 20;
                                            this.isNoSaturdayCheck = true;
                                            store.dispatch('setCadanganUpdatedAction', false)
                                        }
                                    // Also here
                                    } else if (today.getDay() !== 5) {
                                        // console.log('Today is not firday');

                                        store.dispatch('setSaturdayCheckAction', false)
                                        this.noSuratLast++
                                        this.isNoSaturdayCheck = false;

                                    } else if (store.state.noSuratCadanganPrev.includes(this.noSuratBeforeLast)) {
                                        this.noSuratLast++
                                        this.isNoSaturdayCheck = false;
                                    }
                                }

                            // If user use the "nomor surat cadangan"
                        } else if (this.noSuratCadanganField === false) {
                            this.noSuratLast = this.noSuratCadanganSelected
                        }

                        this.noSuratLastString = this.noSuratLast.toString()

                        } else if ( store.state.role === 'admin' || store.state.role === 'secret') {

                           // Condition to continue increasing noSurat number
                                if (this.noSuratLast !== this.lastMaxNoSurat) {
                                    this.noSuratLast = this.lastMaxNoSurat;
                                }
                                
                                if (this.noSuratLast === null || this.noSuratLast === 0) {
                                    this.noSuratLast = 1
                                } else {
                                    // Change the namber at "today.getDay() === 2"
                                    // If you want to change the day that trigger noSuratLast + 10
                                    if (today.getDay() === 5 && store.state.saturdayCheck === false) {
                                        // console.log('Today is firday and false');
                                        
                                        store.dispatch('setSaturdayCheckAction', true)
                                        this.noSuratLast += 20;
                                        this.isNoSaturdayCheck = true;
                                        store.dispatch('setCadanganUpdatedAction', false)

                                    // Don't forget to also change the number here as before
                                    } else if (today.getDay() === 5 && store.state.saturdayCheck === true) {

                                        // console.log('Today is fiday and true');

                                        if (this.noSuratLast === this.noSuratBeforeLast + 20 || this.noSuratLast === this.noSuratBeforeLast + 1 || this.noSuratBeforeLast === 0) {
                                            this.noSuratLast++
                                        } else if (this.noSuratLast === this.lastMaxNoSurat){
                                            this.noSuratLast++;
                                        } else {
                                            this.noSuratLast += 20;
                                            this.isNoSaturdayCheck = true;
                                            store.dispatch('setCadanganUpdatedAction', false)
                                        }
                                    // Also here
                                    } else if (today.getDay() !== 5) {
                                        // console.log('Today is not firday');

                                        store.dispatch('setSaturdayCheckAction', false)
                                        this.noSuratLast++
                                        this.isNoSaturdayCheck = false;

                                    } else if (store.state.noSuratCadanganPrev.includes(this.noSuratBeforeLast)) {
                                        this.noSuratLast++
                                        this.isNoSaturdayCheck = false;
                                    }
                                }
                                this.noSuratLastString = this.noSuratLast.toString()
                        }

                        // console.log(this.noSuratLastString);
                        // console.log(this.noSuratLast, this.noSuratBeforeLast);

                        // console.log('len ', this.noSuratLastString.length);

                        // // Formatting the noSuratLast
                        if (this.noSuratLastString.length === 1) {
                            this.noSuratLastString = '00' + this.noSuratLastString;
                        } else if (this.noSuratLastString.length === 2) {
                            this.noSuratLastString = '0' + this.noSuratLastString;
                        } else if (this.noSuratLastString.length === 3) {
                            this.noSuratLastString = this.noSuratLastString;
                        }

                        this.generatedKode = `${this.kodeSuratSelected} ${this.noSuratLastString}/${this.masalahUtamaSelected}/${this.pejabatTtdSelected}/REG4/${today.getFullYear()}`

                        // Save the data to MongoDB 
                        try {
                            await apis.post
                            (
                                '/noSurat', 
                                { 
                                    idx: '',
                                    noSurat: this.noSuratLast,
                                    isNoSaturday: this.isNoSaturdayCheck,
                                    noKodeSurat: this.generatedKode,
                                    kodeSurat: this.kodeSuratSelected,
                                    masalahUtama: this.masalahUtamaSelected,
                                    pejabatTtd: this.pejabatTtdSelected,
                                    pejabatDesc: this.pejabatDescSelected,
                                    tglKeluar: this.input_tglKeluar,
                                    wktKeluar: this.input_wktKeluar,
                                    perihal: this.input_perihal,
                                    tujuanUnit: this.input_tujuanUnit,
                                    pembuatSurat: this.nama_admin
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
                try {
                    apis.get
                    (
                        `/noSurat/${id}`,
                    )
                    .then(response => {
                        const params = response.data

                        if (params.isNoSaturday === true) {
                            this.isNoSaturdayCheck = false
                            store.dispatch('setSaturdayCheckAction', false)
                            store.dispatch('setCadanganUpdatedAction', false)
                        }
                        
                        try {
                            apis.delete(`/noSurat/${id}`);
                        } catch (error) {
                            console.log(error)
                        }

                    this.$router.go();
                    })
                } catch (error) {
                    console.log(error)
                }
            },

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
                        this.pejabatTtdSelected = params.pejabatTtd
                        this.input_tglKeluar = params.tglKeluar
                        this.input_wktKeluar = params.wktKeluar
                        this.input_perihal = params.perihal
                        this.input_tujuanUnit = params.tujuanUnit
                    })
                } catch (error) {
                    console.log(error)
                }
                this.popUp2Active = true;
            },

            async ubahSuratKeluar() {
                if (                        
                    this.noSuratSelected === ''
                    || this.generatedKode === ''
                    || this.kodeSuratSelected === ''
                    || this.masalahUtamaSelected === ''
                    || this.pejabatTtdSelected === ''
                    || this.input_tglKeluar === ''
                    || this.input_wktKeluar === ''
                    || this.input_perihal === ''
                    || this.input_tujuanUnit === ''
                    ) 
                {
                    this.errorPopUpActive = true;
                } else {
                    console.log('no');
                    const today = new Date();
                    const params = this.selectedNoSuratId

                    this.noSuratLastString = this.noSuratSelected.toString()

                    // // Formatting the noSuratLast
                    if (this.noSuratLastString.length === 1) {
                        this.noSuratLastString = '00' + this.noSuratLastString;
                    } else if (this.noSuratLastString.length === 2) {
                        this.noSuratLastString = '0' + this.noSuratLastString;
                    } else if (this.noSuratLastString.length === 3) {
                        this.noSuratLastString = this.noSuratLastString;
                    }

                    this.generatedKode = `${this.kodeSuratSelected} ${this.noSuratLastString}/${this.masalahUtamaSelected}/${this.pejabatTtdSelected}/REG4/${today.getFullYear()}`

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
                                pejabatTtd: this.pejabatTtdSelected,
                                pejabatDesc: this.pejabatDescSelected,
                                tglKeluar: this.input_tglKeluar,
                                wktKeluar: this.input_wktKeluar,
                                perihal: this.input_perihal,
                                tujuanUnit: this.input_tujuanUnit,
                            },
                            { headers: { 'Content-Type': 'application/json' } }
                        )
                        this.popUp2Active = false
                        router.go(0)
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
        },

        components: {
            navigation,
            customFooter
        }
    }
</script>