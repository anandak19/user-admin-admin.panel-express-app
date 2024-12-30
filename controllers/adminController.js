const userSchema = require('../models/userSchema')

const validateAdmin = async (req, res) => {
    try {
      console.log(req.session.isAdmin);
      if (req.session.user) {
        return res.redirect("/api/admin"); 
      }

      const { username } = req.body;
  
      if (!req.session.isAdmin) {
        return res.render("adminLogin", {
          title: "Admin Login",
          alertMessage: "Access denied",
        });
      }
  
      req.session.user = username;
      return res.redirect("/api/admin");
    } catch (error) {
      return res.status(500).json({ error: "Admin login failed" });
    }
  };
  

const getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find()
        res.render('admin', {users: users})
    } catch (error) {
        res.status(500).json({error: 'Error featching users'})
    }
}


const searchByUsername = async (req, res) =>{
    try {
        const {username} = req.body
        const result = userSchema.findOne({username})
        console.log(result)

    } catch (error) {
        res.status(500)
    }
}

module.exports = {validateAdmin, getAllUsers, searchByUsername}