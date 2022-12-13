<template>
  <div class="home">
    <div class="nav d-flex justify-content-between" style="padding-left: 10px;">
      <p>Penomoran Surat</p>
    </div>
    <div class="p-2">
      <b-form-input
        size="sm"
        v-model="keyword"
        placeholder="Type to Search"
      ></b-form-input>
    </div>
    <div class="p-2">
            <b-dropdown id="dropdown-1" text="Menu" size="sm" variant="success">
              <template #button-content>
                <b-icon icon="plus-lg" aria-hidden="true"></b-icon>
              </template>

              <b-dropdown-item>
                <b-button @click="popUpActive=true" variant="success" size="sm">Tambah Paket</b-button>
                <vs-popup class="holamundo"  title="Tambah Paket" :active.sync="popUpActive">
                    <div>PopUP</div>
                </vs-popup>
              </b-dropdown-item>

              <b-dropdown-item>
                <b-button @click="keTambahSurat()" variant="success" size="sm">Tambah No. Surat</b-button>
              </b-dropdown-item>

              <b-dropdown-item>
                <b-button @click="keDaftarKaryawan()" variant="success" size="sm">Daftar Karyawan</b-button>
              </b-dropdown-item>
    
              <b-dropdown-item>
                  <b-button @click="keDaftarUser()" variant="success" size="sm" :style="{ display }">Daftar User</b-button>
              </b-dropdown-item>
            </b-dropdown>
          </div>

      <div>
        <b-table striped hover :items="koleksiSurat" :sort-desc="true"></b-table>
      </div>
    </div>
</template>

<script>

import Vue from 'vue'
import { vsPopup } from 'vuesax'
import 'vuesax/dist/vuesax.css'

Vue.use(vsPopup)

  import axios from 'axios';
  import tambahSurat from "./tambahSurat.vue"

  export default {
    async mounted() {
      try {
        await axios.get('http://localhost:4041/surat')
        .then((response) => {
          this.koleksiSurat = response.data;
        });
      } catch (error) {
        console.log(error)
      }
    },
    data() {
      return {
        koleksiSurat: [],
        popUpActive: false,
      }
    },
    methods: {
      keTambahSurat() {
        this.$router.push('/tambahSurat');
      },
      simpanData(data) {
        this.dataKiriman = data;
        // console.log('Home:' + data)
        // this.koleksiSurat.push(data);
      }
    },
    computed: {

    }
  }
</script>

<style>
.nav {
  background-color: rgb(230, 226, 235);
  width: 100%;
  height: 50px;
  font-size: 20px;
  padding: 10px;
}
</style>