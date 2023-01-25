import express from "express";

import {
    getKoleksiSurat,
    getSuratById,
    getLastSurat,
    getAllNoSurat,
    simpanSurat,
    updateSurat,
    deleteSurat,
    getState,
    setState
} from '../controllers/noSuratController.js'

const router = express.Router();

router.get('/api/noSurat', getKoleksiSurat);
router.get('/api/noSurat/:id', getSuratById);
router.get('/api/lastNoSurat/', getLastSurat);
router.get('/api/getAllNoSurat/', getAllNoSurat);
router.post('/api/noSurat', simpanSurat);
router.patch('/api/noSurat/:id', updateSurat);
router.delete('/api/noSurat/:id', deleteSurat);

router.get('/api/state/', getState);
router.patch('/api/state/', setState);

export default router;