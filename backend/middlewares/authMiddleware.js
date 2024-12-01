import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    // Read JWT fromm the 'jwt'
    token = req.cookies.jwt

    if (token) {
        try {

            const decode =jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.userId).select('-password')
            next();

        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, token failed.")
        }
    } else {
        res.status(401)
        throw new Error("Not autthorized, no token.")
    }

});

const authorizeAdmin = (req,res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send("Not authorized as an admin")
    }
}

export {authenticate, authorizeAdmin}