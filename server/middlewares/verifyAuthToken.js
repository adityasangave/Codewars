const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

function verify(req, res, next) {
    const authHeader = req.headers['authorization']

    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return res.json({"Error" : "Token not found"}).status(403);

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user)=>{
        if(err)
            res.send({"Error" : "Unable to verify user"}).status(403);

        else req.user = user;
        next()
    })
}

module.exports = verify