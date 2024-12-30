const express = require("express");
const {
  validateAdmin,
  getAllUsers,
} = require("../controllers/adminController");
const {
  adminLoginValidate,
  checkIsAdmin,
} = require("../middleware/adminLoginValidate");
const fetchUsers = require("../utility/getUsers");

const router = express.Router();

// get admin panel
router.get("/admin", async (req, res) => {
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

// get all usres
router.get("/admin/users", checkIsAdmin, getAllUsers);

// search user by username
router.get("/admin/action/search", checkIsAdmin);

// create new user
router.post("/admin/action/create", checkIsAdmin);

// update a user data
router.patch("/admin/action/update", checkIsAdmin);

// delete a user
router.delete("/admin/action/delete", checkIsAdmin);

module.exports = router;
