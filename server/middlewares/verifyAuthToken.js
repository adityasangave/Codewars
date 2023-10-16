const jwt = require('jsonwebtoken');

function verify(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(403).json({"Error": "Token not found"});
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({"Error": "Unable to verify user"});
        }

        // Store the user object in the request for later use
        req.user = user;

        next();
    });
}

module.exports = verify;
