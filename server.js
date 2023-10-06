const jwt = require('jsonwebtoken');

const authenticate_token = ( req, res, next ) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]; //Get token portion
    if (token === null || token === undefined) {
        return res.status(401).send();
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
        if (err) return res.status(403).send();
        req.user = user;
        next();
    });
}


const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '15'});
}


module.exports = {
    authenticate_token,
    generateAccessToken
}
