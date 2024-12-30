const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { signupValidations } = require("../middleware/signupValidation");
const { loginValidate } = require("../middleware/loginValidator");

const router = express.Router();

// get login
router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("login", { title: "Login" });
  }
});

//submit login
router.post("/login/submitted", loginValidate, loginUser);

// logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to destroy session");
    }
    res.clearCookie("connect.sid");
    res.redirect('/api/login')
  });
});

//get signup
router.get("/signup", (req, res) => {
  if (req.session.user) {
    res.redirect("/"); 
  } else {
    res.render("signup", { title: "Signup" });
  }
});

// submit signup
router.post("/signup/submited", signupValidations, registerUser);

module.exports = router;
