const User = require("../models/UserModel");
const sendEmail = require('../utils/emailSender')
const { handleError } = require("../utils/handleError");


const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "something went wrong, please try again later",
      });
    }
    res
      .status(200)
      .json({ status: "success", message: "user updated successfully", user });
  } catch (error) {
    const errors = handleError(error);
    res.status(500).json({ error: errors });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "no user found" });
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
};




const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.userId;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        status: "error",
        error : "provide old password and new password",
      });
    }

    const user = await User.findOne({ _id: userId });
    console.log(user.password);
    const isPasswordMatch = await user.comparePassword(oldPassword);

    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(400).json({
        status: "error",
        message: "old password is incorrect",
      });
    }
    user.password = newPassword;

     await user.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "password updated successfully",
    });
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  updateUser,
  updatePassword,
  getUser
};
