import User from'../models/userModel.js'; // Import User model for database operations
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from "bcryptjs"
import createToken from '../utils/createToken.js';

const createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    console.log("Incoming data:", { username, email, password });
    
    if (!username || !email || !password) {
        throw new Error("Please fill all the inputs");
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400).send("User already exists");
        return;
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt) //to encrypt password

    const newUser = new User({username, email, password: hashedPassword}) // Create a new user instance

    try {
        await newUser.save() // Save the new user to the database

        createToken(res, newUser._id);// token for user

        // Send a response with the new user's data
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        });

    } catch (error) {
        console.error("Error saving user:", error);
        res.status(400)
        throw new Error("Invalid user data.")
    }

})

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})

    if(existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (isPasswordValid) {
            createToken(res, existingUser._id)

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });

            return;
        }
    }

})

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({message: "Logout successfully"});
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users);
;})

const getCurrentUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(404)
        throw new Error("User not found");
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) { // if user is existing
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword;
        }

        const upadatedUser = await user.save(); // saving updated data to db

        res.json({
            _id: upadatedUser._id,
            username: upadatedUser.username,
            email: upadatedUser.email,
            isAdmin: upadatedUser.isAdmin
        })
    } else { //if User is not found
        res.status(404)
        throw new Error("User not found");
    }
})

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        if (user.isAdmin) {
            res.status(400)
            throw new Error("Cannot delete admin user")
        }

        await User.deleteOne({_id: user._id})

        res.json({meassage: "User removed"})
    } else {
        res.status(404)
        throw new Error("User not found");
    }
})

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404);
        throw new Error("User not found");
        
    }
})

const PromoteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        user.isAdmin = req.body.isAdmin || user.isAdmin

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})


export {createUser,
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile, 
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    PromoteUserById
};