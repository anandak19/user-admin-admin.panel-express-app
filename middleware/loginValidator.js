const userSchema = require('../models/userSchema')

const loginValidate = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await userSchema.findOne({ username });
        if (!user) {
            req.flash('alertMessage', 'User does not exist. Please sign up first!');
            return res.redirect('/api/login');
        }

        if (user.password !== password) {
            req.flash('alertMessage', 'Incorrect password. Please enter correct password');
            req.flash('username', username);
            return res.redirect('/api/login');
        }

        req.session.user = username;
        res.redirect('/')
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error logging in user' });
    }
};



module.exports = {loginValidate}