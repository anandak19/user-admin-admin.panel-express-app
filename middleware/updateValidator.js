const {
  validateName,
  validatePassword,
  validateUpdatedUsername,
  validateUpdatedEmail,
} = require("../utility/validationUtility");

const updateValidator = async (req, res, next) => {
  console.log("update start");
  try {
    const { fullname, username, email, password, confirmPassword } = req.body;
    const userData = { fullname, username, email, password };
    const alertMessage =
      (await validateName(fullname)) ||
      (await validateUpdatedUsername(username)) ||
      (await validateUpdatedEmail(email)) ||
      (await validatePassword(password, confirmPassword));

    if (alertMessage) {
      const isAdmin = req.session.isAdmin;
      console.log("update end");
      res.render("updateUser", {
        title: "Update User",
        alertMessage: alertMessage,
        isAdmin: isAdmin,
        userData,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error on updated data validation" });
  }
};

module.exports = { updateValidator };
