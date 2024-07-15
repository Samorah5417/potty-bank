const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWare/authenticateUser");
const {
  
    createTicket,
    getTicketUser,
    getTicketAdmin

} = require("../controllers/supportController");

router
  .post(
    "/ticket",
    authenticateUser,
    authorizePermissions("user", "admin"),
    createTicket
  )
  .get(
    "/ticket",
    authenticateUser,
    authorizePermissions("user", "admin"),
    getTicketUser
  )
  .get(
    "/ticket/admin",
    authenticateUser,
    authorizePermissions("admin"),
    getTicketAdmin
  );

module.exports = router;
