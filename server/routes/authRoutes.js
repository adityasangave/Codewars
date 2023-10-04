const express = require('express')
const User = require('../models/User')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')

const router = express.Router()

//Sign up Endpoint
router.post('/register', async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        let user = await User.findOne({email});

        if(user)
            res.json({"Error" : "User with email already exists"}).status(203);

        let hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name : name,
            email : email,
            password : hashedPassword
        })  
        
        res.json({"Success" : "User Created Successfully"}).json(200);

    } catch (error) {
        console.log("Error creating user" + error);
    }
})

//login endpoint
router.get('/login', async (req, res)=>{
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user)
            res.json({"Error" : "Wrong Credentials"}).status(403)

        await bcrypt.compare(user.password, password, function(err, result){
            if(!err)
                res.json({"Success" : user.email}).status(200) 
            else
                res.json({"Error" : "Wrong Credentials" + err + result}).status(403)
        })

    } catch (error) {
        res.send("Something Wen wrong" + error).status(403)
    }
})

module.exports = router