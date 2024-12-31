const userSchema = require("../models/userSchema");

const nameRegex = /^[a-zA-Z\s]+$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

const validateName = (fullName) => {
  if (
    (!fullName && fullName.length < 2) ||
    fullName > 20 ||
    !nameRegex.test(fullName)
  ) {
    return "Full name must be between 2 and 20 characters long and contain only letters and spaces.";
  }
  return null;
};

const validateUsername = async (username) => {
  if (
    (!username && username.length < 3) ||
    username.length > 10 ||
    !usernameRegex.test(username)
  ) {
    return "Username must be between 3 and 20 characters long and contain only letters, numbers, and underscores.";
  }
  const existingUser = await userSchema.findOne({ username });
  if (existingUser) {
    return "This username is already taken. Try different username";
  }
  return null;
};

const validateUpdatedUsername = async(username) => {
  if (
    (!username && username.length < 3) ||
    username.length > 10 ||
    !usernameRegex.test(username)
  ) {
    return "Username must be between 3 and 20 characters long and contain only letters, numbers, and underscores.";
  }
  return null;
};

const validateEmail = async (email) => {
  if (!email || !emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  const existingUser = await userSchema.findOne({ email });
  if (existingUser) {
    return "This email is already registered. Please use a different email.";
  }
};

const validateUpdatedEmail = async (email) => {
  if (!email || !emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
};

const validatePassword = async (password, confirmPassword) => {
  if (!password || passwordRegex.test(password)) {
    return "Password must be at least 8 characters long and include at least one letter and one number.";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match. Please try again.";
  }
};


module.exports = {
  validateName,
  validateUsername,
  validateUpdatedUsername,
  validateEmail,
  validateUpdatedEmail,
  validatePassword,
};
