
// Input the childern of data of the "Kode Masalah" HK.000 (Hukum)

const cabangHK000 = [
    {value: 'HK.100', text: "Peraturan Non perusahaan", desc: "Peraturan yang dikeluarkan oleh instansi - instansi diluar perusahaan yang berkaitan dengan : - Kebijakan dasar, - strategi pengelolaan, - standar peralatan/pengoperasian alat telekomunikasi"},

    {value: 'HK.200', text: "Peraturan Perusahaan", desc: 'Peraturan-peraturan yang dikeluarkan oleh unit kerja yang berwewenang didalam perusahaan (peraturan, keputusan, instruksi SE) yang meliputi : -kebijaksanaan dasar, -petunjuk pelaksanaan (juklak), -petunjuk tekhnis (juknis), -prosedur tetap (protap)'},

    {value: 'HK.300', text: "PERDATA", desc: 'naskah/dokumen yang berkaitan dengan urusan keperdataan didalam perusahaan dan antara perusahaan dengan pihak luar'},
    
    {value: 'HK.400', text: "PIDANA", desc: 'naskah/dokumen yang ebrkaitan dengan tindak pidana yang dilakukan oleh pihak dalam maupun luar perusahaan, terhadap PT Telkom'},

    {value: 'HK.500', text: "PERIJINAN", desc: 'Naskah/dokumen yang berkaitan dengan pemberian ijin oleh PT Telkom'},
    
    {value: 'HK.600', text: "PELAYANAN UMUM", desc: 'naskah/dokumen yang berkaitan dengan pelayanan hukum yang diberikan kepada pihak dalam dan pihak lain'},

    {
        value: "HK.700",
        text: "PENYELESAIAN HUKUM",
        desc: "naskah dokumen yang berkaitan dengan penyelesaian masalah hukum yang dilaksanakan oleh PT Telkom"
    },

]

const cabangHK100 = [
    {value: 'HK.110', text: "Peraturan Lembaga", desc: "Kebijakan dasar yang dikeluarkan oleh lembaga lembaga tinggi negara seperti MPR, DPR, DPA & lembaga pemerintah lainnya. Contoh : - TAP MPR, - Peraturan Pemerintah ,- Inpres/kepres, - Perda"},

    {value: 'HK.120', text: "Peraturan Departemen", desc: "Kebijakan dasar yang tingkatannya lebih operasional dari yang dikeluarkan oleh departemen departemen teknik (misal : DEPARPOSTEL, DEPNAKER, Perindustrian, dll) dan Direktorat jendral yang bernaung dibawahnya"},

    {value: 'HK.130', text: "Peraturan Non Departemen", desc: "Kebijakan dasar yang dikeluarkan oleh lembaga lembaga tinggi negara seperti MPR, DPR, DPA & lembaga pemerintaah lainnya"},

    {value: 'HK.140', text: "Peraturan Internasional", desc: "Kebijakan dasar yang berkaitan dengan spesifikasi peralatan dan pengelolaan telekomunikasi secara umum yang dikeluarkan oleh lembaga internasional yang berwenang (ITU, CCITT, dll)"},

    {value: 'HK.150', text: "Peraturan Non perusahaan lainnya", desc: "Naskah/dokumen yang berkaitan dengan produk peraturan non perusahaan lainnya"},

]

const cabangHK200 = [
    {value: 'HK.210', text: "Peraturan bidang tekhnik telekomunikasi", desc: "peraturan peraturan dalam bidang tekhnik telekomunikasi yang meliputi operasi tekhnik, pemeliharaan, instalasi & Konstruksi, ataupun network dari perangkat : -sentral telekomunikasi, -sistem transmisi, -jaringan lokal/kabel, -catu daya/mechanical electrical dan sarpen lainnya"},

    {value: 'HK.220', text: "Peraturan bidang pelayanan", desc: "Peraturan peraturan dalam bidang pelayanan (service) terhadap pelanggan yang meliputi: -pelayanan jasa telekomunikasi perorangan (telepon,telex/telegrap, faksimil, sistem komunikasi data, sirkit langganan, jasa transponder, mobile telephone, JASNITA dan lainnya), - pelayanan jasa telekomunikasi umum (TUC, TUK, kamar bicara umum WARTEL, Telegram, kartu telepon dan lainnya)"},

    {value: 'HK.230', text: "Peraturan bidang-bidang keuangan", desc: "peraturan peraturan dalam bidang keuangan misalnya : -bank, -anggaran, -perbendaharaaan, -akuntansi, -pendapatan, -pembiayaan, -tarif"},

    {value: 'HK.240', text: "Peraturan bidang Logistik", desc: "Peraturan peraturan dalam bidang logistik/perlengkapan, misalnya :-kebijaksanaan perlengkapan, -tata cara pengadaan jasa"},

    {value: 'HK.250', text: "Peraturan bidang sumber Daya Manusia / DIKLAT", desc: "Peraturan peraturan dalam bidang sumber daya manusia dan pendidikan dan latihan misalnya : -mutasi karyawan/cuti, -penghargaan, -fasilitas karyawan"},

    {value: 'HK.260', text: "Peraturan bidang pengawasan Hukum", desc: "peraturan peraturan dan bidang pengawasan dan hukum"},

    {value: 'HK.270', text: "Peraturan bidang pengolahan data/pelaporan", desc: "peraturan peraturan dalam bidang pengelohan data/pelaporan : -peraturan SIMAK"},

    {value: 'HK.280', text: "Peraturan bidang penelitian/pengembangan", desc: "peraturan peraturan dalam bidang penelitian/pengembangan"},

    {value: 'HK.290', text: "Peraturan bidang lainnya", desc: "peraturan peraturan dalam bidang bidang yang tidak termasuk dalam klasifikasi diatas: -peraturan bidang umum (kebersihan, building management, dll)"},
]

const cabangHK300 = [
    {value: 'HK.310', text: "Perseorangan", desc: "naskah/dokumen yang berkaitan dengan urusan keperdataaan antara perseorangan didalam perusahaan dan dengan pihak luar"},

    {value: 'HK.320', text: "Kebendaan", desc: "naskah / dokumen yang berkaitan dengan urusan keperdataan dalam hal kebendaan"},

    {value: 'HK.330', text: "Pembuktian dan kadaluarsa", desc: "naskah/dokumen yang berkaitan dengan urusan pembuktian masalah keperdataan dan kadaluarsa"},

    {value: 'HK.340', text: "Tanah/Bangunan", desc: "naskah/dokumen yang berkaitan dengan urusan tanah/bangunan: -pembebasan tanah, -pembebasan rumah"},
]

const cabangHK400 = [
    {value: 'HK.410', text: "Kejahatan/Kriminalitas", desc: "naskah/dokumen yang berkaitan dengan tindak pidana kejahatan/kriminalitas"},
    {value: 'HK.420', text: "Pelanggaran", desc: "naskah/dokumen yang berkaitan dengan tindak pidana pelanggaran"},
]

const cabangHK500 = [
    {value: 'HK.510', text: "Surat Kuasa", desc: "Naskah/dokumen yang berkaitan dengan penerbitan surat kuasa"},
    {value: 'HK.520', text: "Dispensasi", desc: "naskah/dokumen yang berkaitan dengan penerbitan dispensasi"},
    {value: 'HK.530', text: "Lisensi", desc: "naskah/dokumen yang berkaitan dengan penerbitan lisensi"},
    {value: 'HK.540', text: "Konsesi", desc: "naskah/dokumen yang berkaitan dengan penerbitan konsesi dari suatu daerah"},
    {value: 'HK.550', text: "Rekomendasi", desc: "naskah/dokumen yang berkaitan dengan pemberian rekomendasi"},
    {value: 'HK.560', text: "Surat Ijin", desc: "naskah/dokumen yang berkaitan dengan penerbitan surat ijin"},
    {value: 'HK.570', text: "Legalisasi Dokumen", desc: "naskah/dokumen yang berkaitan dengan penerbitan legalisasi dokumen"},
    {value: 'HK.580', text: "Perijinan lainnya", desc: "naskah/dokumen yang berkaitan dengan jenis perijinan lainnya"},
]

const cabangHK600 = [
    {  
        value: "HK.610",
        text: "Bantuan Hukum Konsultasi",
        desc: "naskah dokumen yang berkaitan dengan pemberian bantuan hukum konsultasi hukum oleh PT Telkom"
    },

    {
        value: "HK.620",
        text: "Kajian Hukum",
        desc: "naskah dokumen yang berkaitan dengan kajian hukum"
    },

]


const cabangHK700 = [

]

export { 
    cabangHK000, 
    cabangHK100, 
    cabangHK200, 
    cabangHK300, 
    cabangHK400, 
    cabangHK500, 
    cabangHK600, 
};