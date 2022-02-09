exports.blockUser = (req, res, next) => {
    if (!req.user.isBlocked) {
        next()
    } else {
        res.status(401).send({message:"You are blocked"})
    }
}