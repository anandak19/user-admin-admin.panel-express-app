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


module.exports = { registerUser };
