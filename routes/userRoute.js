const express = require('express');
const router = express.Router();
const {
    authenticateUser, authorizePermissions
} = require('../middleWare/authenticateUser')
const {
    register,
    login
} = require('../controllers/authController')
const {
  getUser,
  updateUser,
  getAllUser,
  adminTransfer,
  orderDebitCard,
  updatePassword
} = require("../controllers/userController");

router
.post('/register', register)
.post('/login', login)
.post('/transfer/admin', authenticateUser, authorizePermissions('admin'), adminTransfer)
.post('/order-card', authenticateUser, authorizePermissions('user', 'admin'), orderDebitCard)
.get('/user', authenticateUser, authorizePermissions('user', 'admin'), getUser)
.get('/user/admin', authenticateUser, authorizePermissions('admin'), getAllUser)
.patch('/user', authenticateUser, authorizePermissions('user', 'admin'), updateUser)
.patch('/password', authenticateUser, authorizePermissions('user', 'admin'), updatePassword)

module.exports = router