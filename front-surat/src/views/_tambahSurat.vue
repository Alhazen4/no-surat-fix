<template>
  <div class="wrapper">
    <form class="row form">
    
      <div class="col-md-12">
        <label class="form-label">Nomor Surat</label>
        <b-form-input class="select" type="text" v-model="noSurat" readonly/>
      </div>
      <div class="col-md-12">
        <b-form-select class="select form-select" v-model="selected_deprt" :options="departements"/>
      </div>
    
      <div class="col-md-12">
        <b-form-select class="select form-select" v-model="selected_jenis" :options="jenisSurat"/>
      </div>
      <div class="col-md-5">
        <div class="row justify-content-between">
          <div class="col-tgl">
            <b-form-group label="Tanggal:">
              <b-form-select class="form-select" v-model="selected_tgl" :options="tgl"/>
            </b-form-group>
          </div>
          <div class="col-bln">
            <b-form-group label="Bulan:">
              <b-form-select class="form-select" v-model="selected_bln" :options="bln"/>
            </b-form-group>
          </div>
          <div class="col-thn">
            <b-form-group label="Tahun:">
              <b-form-select class="form-select" v-model="selected_thn" :options="thn"/>
            </b-form-group>
          </div>
        </div>
      </div>
    
      <div class="col-md-12">
          <b-form-group label="Kepada:">
            <input class="select" type="text" v-model="kepada"/>
            <h3>{{ `Kepada Yth ${kepada}` }}</h3>
          </b-form-group>
      </div>
    
      <div class="col-md-10">
        <b-button @click="simpan()" variant="success">Simpan Data</b-button>
      </div>

    </form>
  </div>

</template>

<script>
  import axios from 'axios';

  export default {
    async mounted() {
      try {
        await axios.get('http://localhost:4041/departemen')
        .then((response) => {
          this.departements = response.data;
        });
        await axios.get('http://localhost:4041/jenisSurat')
        .then((response) => {
          this.jenisSurat = response.data;
        });
      } catch (error) {
        console.log(error)
      }
    },
    name: 'tambahSurat',
    data() {
      return {
        no_sekarang: 0,
        selected_deprt: '.',
        selected_jenis: '.',
        selected_tgl: '.',
        selected_bln: '.',
        selected_thn: '.',
        kepada: '',
        no_surat: '',
        departements: [],
        jenisSurat: [],
        bln: [
          {value: 'I', text: 'Januari'},
          {value: 'II', text: 'Februari'},
          {value: 'III', text: 'Maret'},
          {value: 'IV', text: 'April'},
          {value: 'V', text: 'Mei'},
          {value: 'VI', text: 'Juni'},
          {value: 'VII', text: 'Juli'},
          {value: 'VIII', text: 'Agustus'},
          {value: 'IX', text: 'September'},
          {value: 'X', text: 'Oktober'},
          {value: 'XI', text: 'November'},
          {value: 'XII', text: 'Desember'},
        ],
      }
    },
    computed: {
      noSurat: function () {
        const noSurat = `${this.no_sekarang + 1}/${this.selected_deprt}/${this.selected_jenis}/${this.selected_bln}/${this.selected_thn}`
        this.no_surat = noSurat
        return noSurat
      },
      tgl: function () {
        const tgl = []
        for (let index = 1; index <= 31; index++) {
          tgl.push({
            value: `${index}`, 
            text: `${index}`
          });  
        }
        return tgl
      },
      thn: function () {
        const thn = []
        for (let index = 2022; index <= 2032; index++) {
          thn.push({
            value: `${index}`, 
            text: `${index}`
          });  
        }
        return thn
      },
    },
    methods: {
      async simpan() {
        try {
          await axios.post
          (
            'http://localhost:4041/surat', 
            { 
                suratKe: this.no_sekarang + 1, 
                nomorSurat: this.no_surat, 
                departemen: this.selected_deprt,
                jenisSurat: this.selected_jenis,
                tanggal: this.selected_tgl,
                bulan: this.selected_bln,
                tahun: this.selected_thn,
                kepada: this.kepada 
            },
            { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
          )
          this.$router.push('/');
        } catch (error) {
          console.log(error)
        }
      },
    },
  };

</script>