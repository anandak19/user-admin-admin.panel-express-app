const userSchema = require('../models/userSchema')

// write this in try catch 
const loginValidate = async (req, res, next) => {
    const {username, password} = req.body

    const user = await userSchema.findOne({username})
    if (!user) {
        res.render('login', {title: 'Login', alertMessage: 'User does not exist. Please sign up first!'})
    }
    if (user && user.password !== password) {
        res.render('login', {title: 'Login failed', alertMessage: 'Incorrect password. Please enter correct password'})
    }
    next()
}

module.exports = {loginValidate}