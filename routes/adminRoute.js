const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWare/authenticateUser");
const {
  adminTransfer,
  updateTransferCompleted,
  updateTransferFailed,
  updateTransferPending,
  getAllUser,
  getAllTransfersAdmin,
  deleteUser,
} = require("../controllers/adminController");

router
  .post(
    "/transfer/admin",
    authenticateUser,
    authorizePermissions("admin"),
    adminTransfer
  )
  .post(
    "/delete/admin/:userId",
    authenticateUser,
    authorizePermissions("admin"),
    deleteUser
  )
  .post(
    "/transfer/completed/:transferId",
    authenticateUser,
    authorizePermissions("admin"),
    updateTransferCompleted
  )
  .post(
    "/transfer/failed/:transferId",
    authenticateUser,
    authorizePermissions("admin"),
    updateTransferFailed
  )
  .post(
    "/transfer/pending/:transferId",
    authenticateUser,
    authorizePermissions("admin"),
    updateTransferPending
  )
  .get(
    "/user/admin",
    authenticateUser,
    authorizePermissions("admin"),
    getAllUser
  )
  .get(
    "/all-transfer/admin",
    authenticateUser,
    authorizePermissions("admin"),
    getAllTransfersAdmin
  );

module.exports = router;
