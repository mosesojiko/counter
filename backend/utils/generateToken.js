/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign({_id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, isSeller: user.isSeller}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}