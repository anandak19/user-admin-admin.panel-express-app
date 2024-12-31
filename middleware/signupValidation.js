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

    const alertMessage =
      (await validateName(fullname)) ||
      (await validateUsername(username)) ||
      (await validateEmail(email)) ||
      (await validatePassword(password, confirmPassword));

    if (alertMessage) {
      const isAdmin = req.session.isAdmin;
      res.render("signup", {
        title: isAdmin ? "Create User" : "Signup",
        alertMessage: alertMessage,
        actionUrl: isAdmin
          ? "/api/admin/action/create"
          : "/api/signup/submitted",
        isAdmin: isAdmin,
        user: isAdmin ? req.session.user: null,
        fullname, username, email, password, confirmPassword
      });
    } else {
      next();
    }
  } catch (error) {
    console.error("Validation Error:", error.message);
    res.status(500).json({ message: "Server error. User signup failed." });
  }
};


module.exports = { signupValidations };
