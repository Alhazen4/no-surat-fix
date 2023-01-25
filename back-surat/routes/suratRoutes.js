import express from "express";

import {
    getKoleksiSurat,
    getSuratById,
    simpanSurat,
    updateSurat,
    deleteSurat,
    getDepartemen,
    getJenisSurat
} from '../controllers/suratControllers.js'

const router = express.Router();

router.post('/api/surat/witel', getKoleksiSurat);
router.get('/api/surat/:id', getSuratById);
router.post('/api/surat', simpanSurat);
router.patch('/api/surat/:id', updateSurat);
router.delete('/api/surat/:id', deleteSurat);

router.get('/departemen', getDepartemen);
router.get('/jenisSurat', getJenisSurat);

export default router;