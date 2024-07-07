const jwt = require('jsonwebtoken');
const User = require('../models/user.js')
const admin = async(req,res,next) =>{
    try {
        const token = req.header("x-auth-token");
        if(!token){
            //token is null
            return res.status(401).json({msg : "No auth token ,access denied"})

        }
        const isVerified = jwt.verify(token,'passwordKey');
        if(!isVerified){
            return res.status('401').json({msg : "Inavlid Crdentials"});
        }
        if(isVerified.type == 'user' || isVerified.type == 'seller'){
            return res.status('403').json({msg: 'Restricted area - You are not a admin'});
        }
        const user = await User.findById(isVerified.id);

        req.user = isVerified.id;
        req.user = token;
        next();

    } catch (error) {
        res.status(500).json({error : e.message});
    }
};
module.exports = admin;