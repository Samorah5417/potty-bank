const LocalTransfer = require("../models/LocalTransferModel");
const User = require("../models/UserModel");
const sendEmail = require("../utils/emailSender");

const { handleError } = require("../utils/handleError");

const createLocalTransfer = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const user = await User.findById(req.body.user);
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", error: "User not found" });
    }
    const validPin = user.pin == req.body.pin;

    if (!validPin) {
      return res
        .status(401)
        .json({ status: "unauthorized", error: "Invalid PIN" });
    }

    if (req.body.account === "savings") {
      if (
        user.savings_balance < req.body.amount ||
        user.savings_balance === 0
      ) {
        return res
          .status(401)
          .json({ status: "unauthorized", error: "insufficient balance" });
      }
      user.savings_balance -= req.body.amount;
      await user.save();
    }

    if (req.body.account === "checkings") {
      if (
        user.checkings_balance < req.body.amount ||
        user.checkings_balance === 0
      ) {
        return res
          .status(401)
          .json({ status: "unauthorized", error: "insufficient balance" });
      }
      user.checkings_balance -= req.body.amount;
      await user.save();
    }

    const localTransfer = await LocalTransfer.create(req.body);

    res.status(200).json({
      status: "success",
      message: "transaction successfull",
      data: localTransfer,
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

const getUserLocalTransfer = async (req, res) => {
  try {
    const userLocalTransfer = await LocalTransfer.find({
      user: req.user.userId,
    });
    res.status(200).json({
      status: "success",
      nbHits: userLocalTransfer.length,
      data: userLocalTransfer,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

const getAllLocalTransfer = async (req, res) => {
  try {
    const userLocalTransfer = await LocalTransfer.find({});
    res.status(200).json({
      status: "success",
      nbHits: userLocalTransfer.length,
      data: userLocalTransfer,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

module.exports = {
  createLocalTransfer,
  getUserLocalTransfer,
  getAllLocalTransfer,
};
