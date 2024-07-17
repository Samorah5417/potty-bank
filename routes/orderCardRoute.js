const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleWare/authenticateUser");

const {
  orderDebitCard,
  completedOrderCard,
  failedOrderCard,
  pendingOrderCard,
  getAllCards
} = require("../controllers/orderCardController");

router
  .get(
    "/all-cards/admin",
    authenticateUser,
    authorizePermissions("admin"),
    getAllCards
  )
  .post(
    "/order-card",
    authenticateUser,
    authorizePermissions("user", "admin"),
    orderDebitCard
  )
  .post(
    "/card/failed/:cardId",
    authenticateUser,
    authorizePermissions("admin"),
    failedOrderCard
  )
  .post(
    "/card/pending/:cardId",
    authenticateUser,
    authorizePermissions("admin"),
    pendingOrderCard
  )
  .post(
    "/card/completed/:cardId",
    authenticateUser,
    authorizePermissions("admin"),
    completedOrderCard
  );

module.exports = router;
