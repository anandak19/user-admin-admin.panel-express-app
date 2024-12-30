const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    if (req.session.isAdmin) {
      return res.redirect("/api/admin");
    }
    return res.render("home", { title: "Home", user: req.session.user });
  }
  return res.redirect("/api/login");
});

module.exports = router;
