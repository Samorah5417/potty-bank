const CryptoDeposit = require("../models/CryptoDepositModel");
const user = require("../models/UserModel");
const { handleError } = require("../utils/handleError");

const createCryptoDeposit = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const cryptoDeposit = await CryptoDeposit.create(req.body);
    res.status(200).json({
      status: "success",
      message: "crypto transaction successfully initiated",
      cryptoDetails: cryptoDeposit,
    });
  } catch (error) {
    const errors = handleError(error);
    console.log(error);
    res.status(400).json({ status: "failed", error: errors });
  }
};


const getUserCryptoDeposit = async (req, res) => {
  try {
    const userCryptoDeposit = await CryptoDeposit.find({ user: req.user.userId });
    res.status(200).json({
      status: "success",
      nbHits: userCryptoDeposit.length,
      data: userCryptoDeposit,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

const getAllCryptoDeposit = async (req, res) => {
  try {
    const userCryptoDeposit = await CryptoDeposit.find({});
    res.status(200).json({
      status: "success",
      nbHits: userCryptoDeposit.length,
      data: userCryptoDeposit,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

module.exports = {
  createCryptoDeposit,
  getUserCryptoDeposit,
  getAllCryptoDeposit,
};
