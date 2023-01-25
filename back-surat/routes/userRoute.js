import express from "express";

import {
    getUser,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/userController.js"

const router = express.Router();

router.post('/api/users', getUser);
router.get('/api/user/:id', getUserById);
router.patch('/api/user/:id', updateUser);
router.delete('/api/user/:id', deleteUser);

export default router;