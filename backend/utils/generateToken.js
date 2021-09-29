/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    jwt.sign({_id: user._id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}