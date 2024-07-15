const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWare/authenticateUser");
const {
  createCardDeposit,
  getUserCardDeposit,
  getAllCardDeposit,
} = require("../controllers/cardDepositController");

router
  .post(
    "/card-deposit",
    authenticateUser,
    authorizePermissions("user", "admin"),
    createCardDeposit
  )
  .get(
    "/card-deposit",
    authenticateUser,
    authorizePermissions("user", "admin"),
    getUserCardDeposit
  )
  .get(
    "/card-deposit/admin",
    authenticateUser,
    authorizePermissions("admin"),
    getAllCardDeposit
  );

module.exports = router;
