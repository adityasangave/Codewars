const express = require('express')
const User = require('../../models/User/User')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({ "Error": "User not found" });
        }

        const userObj = {
            _id: user._id,
            email: email,
            password: password
        }

        const token = jwt.sign(userObj, process.env.SECRET_TOKEN);

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return res.status(200).json({ "user": user, "token": token });
        } else {
            return res.status(403).json({ "Error": "Wrong Credentials" });
        }
    } catch (error) {
        return res.status(403).json({ "Error": error });
    }
});

module.exports = router