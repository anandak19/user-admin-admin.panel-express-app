const userSchema = require("../models/userSchema")

const fetchUsers = async() => {
    const users = await userSchema.find()
    return users
}

module.exports = fetchUsers