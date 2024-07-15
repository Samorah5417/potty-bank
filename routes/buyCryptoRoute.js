const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWare/authenticateUser");
const {
  createBuyCrypto,
  getUserBuyCrypto,
  getAllBuyCrypto,
} = require("../controllers/buyCryptoController");

router
  .post(
    "/buy-crypto",
    authenticateUser,
    authorizePermissions("user", "admin"),
    createBuyCrypto
  )
  .get(
    "/buy-crypto",
    authenticateUser,
    authorizePermissions("user", "admin"),
    getUserBuyCrypto
  )
  .get(
    "/buy-crypto/admin",
    authenticateUser,
    authorizePermissions("admin"),
    getAllBuyCrypto
  );

module.exports = router;
