const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWare/authenticateUser");
const {
 depositCheck
} = require("../controllers/checkDepositController");

router
  .post(
    "/check-deposit",
    authenticateUser,
    authorizePermissions("user", "admin"),
    depositCheck
  )
  
module.exports = router;
