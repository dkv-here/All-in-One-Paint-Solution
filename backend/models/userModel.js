// for creating and interacting with user collection
import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
},
{timestamps: true}); // Automatically add createdAt and updatedAt fields

const User = mongoose.model('User', userSchema)

export default User;