const express = require("express");
const router = express.Router();

const { createLoan } = require("../controllers/loanController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWare/authenticateUser");

router
.post('/loan', authenticateUser, authorizePermissions('user', 'admin'), createLoan)
module.exports = router;
