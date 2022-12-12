import express from "express";

import {
    signupUser,
    signinUser
} from "../controllers/loginController.js"

const router = express.Router();

router.post('/api/signup', signupUser);
router.post('/api/signin', signinUser);

export default router;