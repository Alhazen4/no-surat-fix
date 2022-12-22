import mongoose from "mongoose";

export const modelSurat = mongoose.Schema(
    {
        idx:{
            type: String,
        },
        noSurat:{
            type: Number,
            required: true
        },
        isNoSaturday:{
            type: Boolean,
            required: true
        },
        noKodeSurat:{
            type: String,
            required: true
        },
        kodeSurat:{
            type: String,
            required: true
        },
        masalahUtama:{
            type: String,
            required: true
        },
        pejabatTtd:{
            type: String,
            required: true
        },
        tglKeluar:{
            type: String,
            required: true
        },
        wktKeluar:{
            type: String,
            required: true
        },
        perihal:{
            type: String,
            required: true
        },
        tujuanUnit:{
            type: String,
            required: true
        },
        pembuatSurat:{
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.model('suratKeluar', modelSurat);