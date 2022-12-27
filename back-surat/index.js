import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import suratRoutes from './routes/suratRoutes.js';
import noSuratRoutes from './routes/noSuratRoute.js';
import loginRoute from './routes/loginRoute.js';
import userRoute from './routes/userRoute.js';
import multer from "multer";

// import 'path' as 'path';
import * as path from 'path';
import * as fs from 'fs';

// How to solve the "__dirname is not defined in ES6" error
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uri = 'mongodb://localhost:27017/no-surat';
const app = express();

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (e) => console.log(e));
db.once('open', () => console.log('Database Surat Connected!'));

app.use(cors());
app.use(express.json());
app.use(suratRoutes);
app.use(noSuratRoutes);
app.use(userRoute);
app.use(loginRoute);

app.use('/api/image', express.static(path.join(__dirname, 'images')));
app.use('/api/diambil_image', express.static(path.join(__dirname, 'diambil_images')));

/**
 * @DESC Photo Upload Configuration
 */

export const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
        ) {
            cb(null, true);
        } else {
        cb(null, false);
    }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single("image"));

app.post('/api/image', async (req, res) => {
    // res.json({ file: req.file.path.replace(/\\/g, "/") });
    // console.log(req.file.filename);
    try {
        res.json({ file: req.file.filename });
    } catch (error) {
        res.json({ error: error})     
    }
    // res.json({ file: req.file });
});

app.delete('/api/image', async (req, res) => {
    // // const path_linux = `/root/no-surat/back-surat/images/${req.body.image}`;
    // console.log(req.body.image)
    fs.unlink(`./images/${req.body.image}`, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
    // res.json({ data: path })
    res.json({ message: 'success' })
});

const PORT = 3030;
app.listen(PORT, () => console.log('Run on http://localhost:3030'));

export default db 