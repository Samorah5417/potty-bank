const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWare/authenticateUser");
const {
  createInternalTransfer,
  getUserInternalTransfer,
  getAllInternalTransfer,
} = require("../controllers/internalTransferController");

router
  .post(
    "/internal-transfer",
    authenticateUser,
    authorizePermissions("user", "admin"),
    createInternalTransfer
  )
  .get(
    "/internal-transfer",
    authenticateUser,
    authorizePermissions("user", "admin"),
    getUserInternalTransfer
  )
  .get(
    "/internal-transfer/admin",
    authenticateUser,
    authorizePermissions("admin"),
    getAllInternalTransfer
  );

module.exports = router;
