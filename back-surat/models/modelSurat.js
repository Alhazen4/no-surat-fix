import mongoose from "mongoose";

export const modelSurat = mongoose.Schema(
    {
        idx:{
            type: String,
        },
        pengirim:{
            type: String,
            required: true
        },
        tglTerima:{
            type: String,
            required: true
        },
        wktTerima:{
            type: String,
            required: true
        },
        perihal:{
            type: String,
            required: true
        },
        tujuanSurat:{
            type: String,
            required: true
        },
        namaPenerima:{
            type: String,
            required: true
        },
        disposisi:{
            type: String
        },
        image: {
            type: String,
            required: true
        },
        local_image: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.model('koleksisurat', modelSurat);