/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');


exports.isAuth = (req, res, next) =>{
    //Verify a user and get information about the user
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.slice(7, authorization.length) //Bearer xxxxx => xxxxx i.e slcice start from x
        //use jwt to dcrypt the token
        return jwt.verify(token, process.env.JWT_SECRET, (err, decode) =>{
            if(err) {
                res.status(401).json({message: "Invalid Token"})
            }else{
                req.user = decode; //info about the user
                next()
            }
        })
    }else{
        return res.status(401).json({message: "There is no token"})
    }
}