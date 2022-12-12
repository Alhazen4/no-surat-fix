import express from "express";
import userModel from "../models/userModel.js";

// NOTE: POST method to create new user is written in loginRoute.js

const router = express.Router();

export const getUser = async (req, res) => {
    try {
        const dataUser = await userModel.find({ "role": "admin" });
        res.json(dataUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const updateUser = async (req, res) => {
    try {
        const userDiubah = await userModel.updateOne(
            {_id: req.params.id},    
            {$set: req.body}    
        );
        res.status(200).json(userDiubah);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userDihapus = await userModel.deleteOne(
            {_id: req.params.id}
        );
        res.status(200).json(userDihapus);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export default router;