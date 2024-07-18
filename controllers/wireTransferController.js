const LocalTransfer = require("../models/LocalTransferModel");
const InternalTransfer = require("../models/InternalTransferModel");
const transferAdmin = require("../models/TransferAdmin")
const WireTransfer = require("../models/WireTransferModel");
const { handleError } = require("../utils/handleError");
const sendEmail = require("../utils/emailSender");

const User = require("../models/UserModel");
const TransferAdmin = require("../models/TransferAdmin");

const createWireTransfer = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const user = await User.findById(req.user.userId);
    if (req.body.pin) {
      const validPin = user.pin == req.body.pin;

      if (!validPin) {
        return res.status(401).json({ status: "failed", error: "Invalid PIN" });
      }
    } else {
      return res
        .status(400)
        .json({ status: "failed", error: "please provide a pin" });
    }

    if (user.savings_balance < req.body.amount || user.savings_balance === 0) {
      return res
        .status(401)
        .json({ status: "unauthorized", error: "insufficient balance" });
    }

    const wireTransfer = await WireTransfer.create(req.body);

    res.status(200).json({
      status: "success",
      message: "transaction successfull",
      data: wireTransfer,
    });

    const subject = "Transfer Request";
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

const getUserWireTransfer = async (req, res) => {
  try {
    const userWireTransfer = await WireTransfer.find({
      user: req.user.userId,
    });
    res.status(200).json({
      status: "success",
      nbHits: userWireTransfer.length,
      data: userWireTransfer,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

const getAllWireTransfer = async (req, res) => {
  try {
    const userWireTransfer = await WireTransfer.find({});
    res.status(200).json({
      status: "success",
      nbHits: userWireTransfer.length,
      data: userWireTransfer,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

// Function to get all transfer histories
const getAllTransfersSavings = async (req, res) => {
  try {
    const wireTransfers = await WireTransfer.find({
      user: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .lean();

      

    const localTransfers = await LocalTransfer.find({
      user: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .lean();
      console.log(req.user.userId);
      console.log("hello local transfers",localTransfers);
    const internalTransfers = await InternalTransfer.find({
      user: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .lean();

      
    const transferAdmin = await TransferAdmin.find({
      user: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    // Combine results into a single array for each account type
    const savingsHistory = [];
    const checkingsHistory = [];

    // Function to push transfers into appropriate history array
    const pushTransferToHistory = (transfer, historyArray) => {
      if (transfer.account === "savings") {
        historyArray.push(transfer);
      } else if (transfer.account === "checkings") {
        historyArray.push(transfer);
      }
    };

    // Push transfers to respective history arrays
    transferAdmin.forEach((transfer) =>
      pushTransferToHistory(transfer, savingsHistory)
    );
    wireTransfers.forEach((transfer) =>
      pushTransferToHistory(transfer, savingsHistory)
    );
    localTransfers.forEach((transfer) =>
      pushTransferToHistory(transfer, savingsHistory)
    );
    internalTransfers.forEach((transfer) =>
      pushTransferToHistory(transfer, savingsHistory)
    );

    // Sort history arrays from newest to oldest
    savingsHistory.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    checkingsHistory.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const allTransfers = {
      savingsHistory,
      checkingsHistory,
    };

    res.status(200).json(allTransfers);
  } catch (error) {
    console.error("Error fetching transfer histories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createWireTransfer,
  getUserWireTransfer,
  getAllWireTransfer,
  getAllTransfersSavings,
};
