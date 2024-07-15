const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWare/authenticateUser");
const {
  createCryptoDeposit,
  getUserCryptoDeposit,
  getAllCryptoDeposit,
} = require("../controllers/cryptoDepositController");

router
  .post(
    "/crypto-deposit",
    authenticateUser,
    authorizePermissions("user", "admin"),
    createCryptoDeposit
  )
  .get(
    "/crypto-deposit",
    authenticateUser,
    authorizePermissions("user", "admin"),
    getUserCryptoDeposit
  )
  .get(
    "/crypto-deposit/admin",
    authenticateUser,
    authorizePermissions("admin"),
    getAllCryptoDeposit
  );

module.exports = router;
