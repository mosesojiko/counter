export const isAuth = (req, res, next) =>{
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.slice(7, authorization.length) //Bearer xxxxx => xxxxx i.e slcice start from x
        //use jwt to dcrypt the token
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) =>{
            if(err) {
                res.status(401).json({message: "Invalid Token"})
            }else{
                req.user = decode; //info about the user
                next()
            }
        })
    }else{
        res.status(401).json({message: "There is no token"})
    }
}