const jwt = require('jsonwebtoken');

function verify(req, res, next) {
    console.log("Middleware triggered")
    const authHeader = req.headers["authorization"];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        console.log("true no token");
        return res.status(403).json({"Error": "Token not found"});
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({"Error": "Unable to verify user"});
        }

        req.user = user;
        next();
    });
}

module.exports = verify;
