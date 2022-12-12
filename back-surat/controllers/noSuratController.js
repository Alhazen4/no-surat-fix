import express from "express";
import modelNoSurat from "../models/modelNoSurat.js";

const router = express.Router();

export const getKoleksiSurat = async (req, res) => {
    try {
        const surat = await modelNoSurat.find();
        res.json(surat);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getLastSurat = async (req, res) => {
    try {
        const surat = await modelNoSurat.find({}, {'noSurat': 1}).sort({ _id: -1 }).limit(2);
        res.json(surat);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getAllNoSurat = async (req, res) => {
    try {
        const surat = await modelNoSurat.find({}, {'noSurat': 1}).sort({ _id: -1 });
        res.json(surat);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getSuratById = async (req, res) => {
    try {
        const surat = await modelNoSurat.findById(req.params.id);
        res.json(surat);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const simpanSurat = async (req, res) => {
    const surat = new modelNoSurat(req.body);
    try {
        const suratBaru = await surat.save();
        res.status(201).json(suratBaru);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateSurat = async (req, res) => {
    try {
        const updateSurat = await modelNoSurat.updateOne(
            {_id:req.params.id},
            {$set: req.body});
            res.status(200).json(updateSurat);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteSurat = async (req, res) => {
    try {
        const deleteSurat = await modelNoSurat.deleteOne(
            {_id:req.params.id}
            );
            res.status(200).json(deleteSurat);
        } catch (error) {
            res.status(400).json({message: error.message});
    }
}

export const getDepartemen = async (req, res) => {
    try {
        const coll = db.collection('departemen');
        coll.find().toArray(function(err, data) {
            res.json(data);
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getJenisSurat = async (req, res) => {
    try {
        const coll = db.collection('jenisSurat');
        coll.find().toArray(function(err, data) {
            res.json(data);
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export default router;