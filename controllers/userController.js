const userShema = require("../models/userSchema");

const registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { fullname, username, email, password } = req.body;
    console.log(fullname);
    const newUser = new userShema({ fullname, username, email, password });
    await newUser.save();
    return next()
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    try {
      const { username } = req.body;
      req.session.user = username;
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ error: "Error loging user" });
    }
  }
};

module.exports = { registerUser, loginUser };
