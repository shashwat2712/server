const express = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("../middlewares/auth");
const authRouter = express.Router();


//SignUp Route 
authRouter.post('/api/signup',async(req,res)=>{
    //get the data from the client
    try {
        const {name,email,password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({msg : 'User with same email already exists!'})
    }
    const hashPassword = await bcryptjs.hash(password,8);//8 --> is a salt here


    let user = new User({
        email,
        password : hashPassword,
        name
    })
    user = await user.save();
    //you can specify like this also res.json({user : user})
    res.json(user);
    // post that data in database


    //return that data to the user
    } catch (e) {
        res.status(500).json({error : e.message});
    }


})

//The auth.js file usually exports an instance of 
//express.Router(), which is used to define a set of 
//routes and middleware related to authentication.


//so now wherever we write
//const authRouter = require('./routes/auth');
//it will make a ptr to the instance of express.Router() created in auth.js
//. This instance is used to define routes and middleware specific to authentication.


//so the authRouter is a sort of private attribute but now it can be used
//anywhere in the app(after exporting it )


authRouter.post('/api/signin',async (req,res) => {
    try{
        const {email ,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res
            .status(400)
            .json({msg : 'User with this email does not exist!'});
            
        }

        //test123
        const isMatch = await bcryptjs.compare(password,user.password);
        if(!isMatch){
            
            return res
            .status(400)
            .json({msg : 'Incorrect Password!'});
        }
        const token = jwt.sign({id : user._id}, "passwordKey");
        res.json({token, ...user._doc});

    }catch(e){
        res.status(500).json({error : e.message});

    }
})


authRouter.post('/tokenIsValid',async(req,res) => {
    try {
        console.log('true');
        const token = req.header('x-auth-token');
        if(!token) return res.json(false);
        
        const isVerified = jwt.verify(token,'passwordKey');
        if(!isVerified)return res.json(false);
        
        //checking that the user obtained is valid or not
        const user = await User.findById(isVerified.id);
        if(!user)return res.json(false);
        console.log('true');
        res.json(true);
    } catch (e) {
        res.status(500).json({error : e.message});
    }
    
})
authRouter.get('/',auth ,async(req,res)=>{
    const user = await User.findById(req.user);
    res.json({...user._doc,token : req.token});
})


module.exports = authRouter;