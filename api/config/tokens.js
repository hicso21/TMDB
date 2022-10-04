require("dotenv").config();
const jwt = require('jsonwebtoken')

const validateToken = (token) => {
    return jwt.verify(token, process.env.SECRET)
}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' })
}

module.exports = { validateToken, generateToken }