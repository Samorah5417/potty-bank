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
  updatePassword
} = require("../controllers/userController");

router
.post('/register', register)
.post('/login', login)
.get('/user', authenticateUser, authorizePermissions('user', 'admin'), getUser)
.patch('/user', authenticateUser, authorizePermissions('user', 'admin'), updateUser)
.patch('/password', authenticateUser, authorizePermissions('user', 'admin'), updatePassword)

module.exports = router