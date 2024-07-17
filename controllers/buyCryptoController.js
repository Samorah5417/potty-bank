const BuyCrypto = require("../models/BuyCryptoModel");
const { handleError } = require("../utils/handleError");
const User = require('../models/UserModel')
const sendEmail = require("../utils/emailSender");


const createBuyCrypto = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const buyCrypto = await BuyCrypto.create(req.body);
    
    res.status(200).json({
      status: "success",
      message: "crypto transaction successfully initiated",
      cryptoDetails: buyCrypto,
    });

    const user = await User.findById(req.user.userId);
    const subject = "Crypto Transaction";
    const text = "";
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transfer Deposit Initiation</title>
    <style>
        /* Add your custom CSS styles here */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #0044cc;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Transfer Deposit Initiation</h1>
        
        <p>Dear ${user.name},</p>
        
        <p>A Transfer deposit was just initiated in your bank account today!</p>
        
        <p>Your transfer deposit can’t be authorized at this moment. Please complete your application processes for successful bank transfers and withdrawals.</p>
        
        <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
        
        <div class="footer">
            <p>Thank you for choosing our services.</p>
        </div>
    </div>
</body>
</html>`;
 
    await sendEmail(user.email, subject, text, html);
    


  } catch (error) {
    const errors = handleError(error);
    console.log(error);
    res.status(400).json({ status: "failed", error: errors });
  }
};

const getUserBuyCrypto = async (req, res) => {
  try {
    const userBuyCrypto = await BuyCrypto.find({ user: req.user.userId });
    res
      .status(200)
      .json({
        status: "success",
        nbHits: userBuyCrypto.length,
        data: userBuyCrypto,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

const getAllBuyCrypto = async (req, res) => {
  try {
    const userBuyCrypto = await BuyCrypto.find({});
    res.status(200).json({
      status: "success",
      nbHits: userBuyCrypto.length,
      data: userBuyCrypto,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

module.exports = {
  createBuyCrypto,
  getUserBuyCrypto,
  getAllBuyCrypto
};
