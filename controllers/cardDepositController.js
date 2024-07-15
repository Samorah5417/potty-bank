const CardDeposit = require("../models/CardDepositModel");
const user = require("../models/UserModel");
const { handleError } = require("../utils/handleError");

const createCardDeposit = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const cardDeposit = await CardDeposit.create(req.body);
    res.status(200).json({
      status: "success",
      message: "card transaction successfully initiated",
      cardDetails: cardDeposit,
    });
  } catch (error) {
    const errors = handleError(error);
    console.log(error);
    res.status(400).json({ status: "failed", error: errors });
  }
};

const getUserCardDeposit = async (req, res) => {
  try {
    const userCardDeposit = await CardDeposit.find({ user: req.user.userId });
    res.status(200).json({
      status: "success",
      nbHits: userCardDeposit.length,
      data: userCardDeposit,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

const getAllCardDeposit = async (req, res) => {
  try {
    const userCardDeposit = await CardDeposit.find({});
    res.status(200).json({
      status: "success",
      nbHits: userCardDeposit.length,
      data: userCardDeposit,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

module.exports = {
  createCardDeposit,
  getUserCardDeposit,
  getAllCardDeposit,
};
