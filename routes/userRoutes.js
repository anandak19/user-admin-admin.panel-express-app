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
    const message = req.flash('message')
    const alertMessage = req.flash('alertMessage')
    const username = req.flash('username')
    res.render("login", { title: "Login", message, alertMessage, username });
  }
});

//submit login
// router.post("/login", loginValidate, loginUser);
router.post("/login", loginValidate);

// logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to destroy session");
    }
    res.clearCookie("connect.sid");
    res.redirect("/api/login");
  });
});

//get signup
router.get("/signup", (req, res) => {
  if (req.session.user && !req.session.isAdmin) {
    res.redirect("/");
  } else {
    const isAdmin = req.session.isAdmin;
    res.render("signup", {
      title: isAdmin ? "Create User" : "Signup",
      actionUrl: isAdmin
      ? "/api/admin/action/create"
      : "/api/signup/submitted",
      isAdmin: isAdmin,
      user: req.session.user
    });
  }
});

// submit signup
router.post(
  "/signup/submitted",
  signupValidations,
  registerUser,
  (req, res) => {
    req.flash('message', 'Signup Succesfull. Please login now to continue')
    res.redirect("/api/login");
  }
);

module.exports = router;
