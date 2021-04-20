import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//? add protect controller before any controller in the app which requires authorization before going showing that rotue contnet
const protect = asyncHandler(async (req,res,next)=>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try{
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        //? now req object will have user field to access
        req.user = await User.findById(decoded.id).select('-password') //? we don't want password of user from the datrabse

        next()
        }
        catch(err){
            console.error(err)
            res.status(401);
            
            throw new Error('Not Authorized , token inValid')
        }

    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized , token not found')
    }
})

export {protect}