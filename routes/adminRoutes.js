const express = require("express");
const {
  validateAdmin,
  deleteUser,
  searchByUsername,
} = require("../controllers/adminController");
const {
  adminLoginValidate,
  checkIsAdmin,
} = require("../middleware/adminLoginValidate");
const fetchUsers = require("../utility/getUsers");

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
router.post("/admin/action/create", checkIsAdmin);

// update a user data
router.patch("/admin/action/update", checkIsAdmin);

// delete a user
router.post("/admin/action/delete/:username", checkIsAdmin, deleteUser);

module.exports = router;
