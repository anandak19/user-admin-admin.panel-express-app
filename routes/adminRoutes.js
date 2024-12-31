const express = require("express");
const {
  validateAdmin,
  deleteUser,
  searchByUsername,
  setUpdateForm,
  updateUser,
} = require("../controllers/adminController");
const {
  adminLoginValidate,
  checkIsAdmin,
} = require("../middleware/adminLoginValidate");
const fetchUsers = require("../utility/getUsers");
const { signupValidations } = require("../middleware/signupValidation");
const { registerUser } = require("../controllers/userController");
const { updateValidator } = require("../middleware/updateValidator");

const router = express.Router();


// get admin panel
router.get("/admin",checkIsAdmin, async (req, res) => {
  if (req.session.user) {
    const users = await fetchUsers()
    res.render("adminPanel", { title: "Admin Panel", user: req.session.user, users });
  } else {
    res.redirect("/api/admin/login");
  }
});

// login admin
router.get("/admin/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("adminLogin", { title: "Admin Login" });
  }
});

// admin login form submited
router.post("/admin/login/submitted", adminLoginValidate, validateAdmin);

// search user by username
router.post("/admin/action/search", checkIsAdmin, searchByUsername);

// create new user
router.post("/admin/action/create", checkIsAdmin, signupValidations, registerUser, (req, res) => {
  res.redirect("/api/admin");
});

// update a user data
router.get("/admin/updateform/:userId", checkIsAdmin, setUpdateForm)
router.post("/admin/action/update/:userId", checkIsAdmin, updateValidator, updateUser);

// delete a user
router.post("/admin/action/delete/:username", checkIsAdmin, deleteUser);

module.exports = router;
