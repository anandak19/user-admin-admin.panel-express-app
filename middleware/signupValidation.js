const userShema = require("../models/userSchema");
const {
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
} = require("../utility/validationUtility");

const signupValidations = async (req, res, next) => {
  try {
    const { fullname, username, email, password, confirmPassword } = req.body;
    let alertMessage = await validateName(fullname) || await validateUsername(username) || await validateEmail(email) || await validatePassword(password, confirmPassword);

    if (alertMessage) {
      res.render('signup', {title: 'Signup', alertMessage: alertMessage} )
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({error: "Server error"})
  }
};

module.exports = {signupValidations}