const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res ,next) =>{
    const secret_key = process.env.JWT_SECRET;
    try {
        const token = req.header("x-auth-token");
        if(!token)
            return res.status(401).json({msg : "No auth token, access denied."})
        const isVerified = jwt.verify(token,secret_key);
        if(!isVerified)
            return res
            .status(401)
            .json({msg : "Token verification failed,authorization denied."});
        req.user = isVerified.id;
        req.token = token;
        next();
    } catch (e) {
        res.status(500).json({error : e.message});
    }
}
module.exports = auth;
