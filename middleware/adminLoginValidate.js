const userSchema = require("../models/userSchema");

const adminLoginValidate = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userSchema.findOne({ username });
    if (!user) {
      return res.render("adminLogin", {
        title: "Admin Login",
        alertMessage: "Admin does not exist with this username",
      });
    }
    if (user && user.password !== password) {
      return res.render("adminLogin", {
        title: "Admin Login",
        alertMessage: "Incorrect password. Please enter correct password",
      });
    }
    if(user && !user.isAdmin){
        return res.render('adminLogin', {title: 'Admin Login', alertMessage: 'Access denied'})
    }
    req.session.isAdmin = user.isAdmin
    next()
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
};

const checkIsAdmin = async (req, res, next) => {
  if (req.session.user && req.session.isAdmin) {
    return next();
  }
  return res.redirect('/api/admin/login');
}

module.exports = {adminLoginValidate, checkIsAdmin}
