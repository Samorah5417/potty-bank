const LocalTransfer = require("../models/LocalTransferModel");
const User = require("../models/UserModel");
const sendEmail = require("../utils/emailSender");

const { handleError } = require("../utils/handleError");

const createLocalTransfer = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", error: "User not found" });
    }
    const validPin = user.pin === req.body.pin;
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
          .json({ status: "unauthorized", error: "Insufficient balance" });
      }
      user.savings_balance -= req.body.amount;
    } else if (req.body.account === "checkings") {
      if (
        user.checkings_balance < req.body.amount ||
        user.checkings_balance === 0
      ) {
        return res
          .status(401)
          .json({ status: "unauthorized", error: "Insufficient balance" });
      }
      user.checkings_balance -= req.body.amount;
    } else {
      return res
        .status(400)
        .json({ status: "failed", error: "Invalid account type" });
    }

    // Save user's updated balance
    await user.save();

    // Create local transfer
    const localTransfer = await LocalTransfer.create({
      ...req.body,
      name: user.name,
      userId: user._id, // Assuming you need to store user ID in transfer document
    });

    // Send success response
    res.status(200).json({
      status: "success",
      message: "Transaction successful",
      data: localTransfer,
    });

    // Send email notifications
    const subject = "Transfer Deposit Initiation";
    const text = "A transfer deposit was initiated in your bank account.";
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
          <p>${text}</p>
          <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
          <div class="footer">
            <p>Thank you for choosing our services.</p>
          </div>
        </div>
      </body>
      </html>`;

    await sendEmail(user.email, subject, text, html); // Send email to user
    await sendEmail(
      "Allenjenny126@gmail.com",
      `From ${user.email}`,
      text,
      html
    ); // Send notification to admin
  } catch (error) {
    console.error("Error creating local transfer:", error);
    res
      .status(400)
      .json({
        status: "failed",
        error: "An error occurred while processing your request",
      });
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
