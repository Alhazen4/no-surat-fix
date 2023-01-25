import express from "express";
import userModel from "../models/userModel.js";

const router = express.Router();

export const signupUser = async (req, res) => {
    try {
        // Validate the username
        let usernameNotTaken = await validateUsername(req.body.username);

        // If username taken
        if (!usernameNotTaken) {
            return res.status(400).json({
                message: 'Username already taken!',
                success: false
            });
        }

        // Validate the emails
        let emailNotTaken = await validateEmail(req.body.email);
        // If email taken
        if (!emailNotTaken) {   
            return res.status(400).json({
                message: 'Email already taken!',
                success: false
            });
        }

        // Create a new user
        const newUser = new userModel({
            ...req.body,
        });
        await newUser.save();

        return res.status(200).json({
            message: 'You have registered!',
            success: true
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'Cant create accounts!',
            success: false
        });
    }
};

export const signinUser = async (req, res) => {
    let { username, password } = req.body;

    const checkUsername = await userModel.findOne({ username });
    if (!checkUsername) {
        return res.status(404).json({
            message: 'Username not found!',
            success: false
        });
    }
    
    let checkPassword = await userModel.find({ username: username }).projection({password});
    if (checkUsername.password === checkPassword.password) {

        let result = {
            user_id: checkUsername._id,
            username: checkUsername.username,
            role: checkUsername.role,
            unitOrWitel: checkUsername.unitOrWitel,
            email: checkUsername.email,
        }

        res.status(200).json({
            ...result,
        })
    } else {
        return res.status(403).json({
            message: `Incorrect Password!`,
            success: false
        });
    }
};

const validateUsername = async username => {
    let check = await userModel.findOne({ username });
    return check ? false : true;
};

const validateEmail = async email => {
    let check = await userModel.findOne({ email });
    return check ? false : true;
};

export default router;