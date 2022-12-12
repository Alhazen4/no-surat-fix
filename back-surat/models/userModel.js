/* Importing the mongoose module. */
import mongoose from "mongoose";

/* Creating a schema for the database. */
export const userModel = mongoose.Schema(
    {
        idx: {
            type: String,
        },
        nama: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
        { timestamps: true }
);

/* Exporting the model to be used in other files. */
export default mongoose.model('user_data', userModel)