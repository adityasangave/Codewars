const express = require("express")
const Challenge = require('../../models/Core/Challenge')
const verify = require('../../middlewares/verifyAuthToken')

const router = express.Router()

// Endpoint to create challenge
router.post('/create-challenge', verify, (req, res)=>{
    res.status(200).send("user"+req.user)
})

module.exports = router;
