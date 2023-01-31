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

import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getState = (req, res) => {
    fs.readFile(__dirname + "/state.json", "utf8", (err, jsonString) => {
    if (err) {
        res.status(504)
        return;
    }
    res.send(JSON.parse(jsonString));
    });
}

export const setState = (req, res) => {
    const stateData = fs.readFileSync(__dirname + "/state.json", "utf8")
    const convJson = JSON.parse(stateData)
    
    if (req.body.saturdayCheck !== undefined) {
        convJson["saturdayCheck"] = req.body.saturdayCheck;
    }

    convJson["cadanganUpdate"] = req.body.cadanganUpdate;
    fs.writeFileSync(__dirname + "/state.json", JSON.stringify(convJson));
    res.status(200).json({message: "OK"})
}

export default router;