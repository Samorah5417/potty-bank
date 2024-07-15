const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWare/authenticateUser");
const {
  createWireTransfer,
  getUserWireTransfer,
  getAllWireTransfer,
  getAllTransfersSavings,
} = require("../controllers/wireTransferController");

router
  .post(
    "/wire-transfer",
    authenticateUser,
    authorizePermissions("user", "admin"),
    createWireTransfer
  )
  .get(
    "/wire-transfer",
    authenticateUser,
    authorizePermissions("user", "admin"),
    getUserWireTransfer
  )
  .get(
    "/all-transfer",
    authenticateUser,
    authorizePermissions("user", "admin"),
    getAllTransfersSavings
  )
  .get(
    "/wire-transfer/admin",
    authenticateUser,
    authorizePermissions("admin"),
    getAllWireTransfer
  );

module.exports = router;
