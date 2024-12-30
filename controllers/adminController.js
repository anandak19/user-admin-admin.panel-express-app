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
        res.render('adminPanel', {users: users})
    } catch (error) {
        res.status(500).json({error: 'Error featching users'})
    }
}

// search 
const searchByUsername = async (req, res) =>{
    try {
        const {username} = req.body
        const result = await userSchema.findOne({username})
        res.render('adminPanel', {users: [result], user: req.session.user})
    } catch (error) {
        res.status(500).json({message: 'Error searching user', error: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const {username} = req.params
        const deletedUser = await userSchema.findOneAndDelete({username})
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.redirect('/api/admin')
    } catch (error) {
        console.error('Error deleting user:', error); 
        res.status(500).json({ message: 'Error deleting the user', error: error.message })
    }
}

const setUpdateForm = async(req, res) => {
  try {
    const {userId} = req.params
    console.log(req.params)
    const userData = await userSchema.findById(userId)
    console.log(userData)
    if (!userData) {
      console.log("not admin")
      res.redirect('/api/admin')
    }else{
      console.log("admin - rendering page")
      res.render('updateUser', {title: 'Update User', user: req.session.user, userData})
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
//
const updateUser = async (req, res) => {
  try {
    const {userId} = req.params
    const { fullname, username, email, password } = req.body;
    console.log(req.params)
    const updatedUser = await userSchema.findByIdAndUpdate(userId, { fullname, username, email, password })
    if (!updatedUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    res.redirect('/api/admin')
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Error updating user'})
  }
}

module.exports = {validateAdmin, getAllUsers, searchByUsername, deleteUser, setUpdateForm, updateUser}