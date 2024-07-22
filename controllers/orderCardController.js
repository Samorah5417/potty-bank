const sendEmail = require("../utils/emailSender");
const OrderCard = require("../models/OrderCard");
const User = require('../models/UserModel')

const orderDebitCard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", error: "User not found" });
    }

    const { address } = req.body;
    if (!address) {
      return res
        .status(400)
        .json({ status: "failed", error: "Please enter mailing address" });
    }

    const orderCard = await OrderCard.create({
      ...req.body,
      user: req.user.userId,
      name: user.name,
    });

    const subject = "Debit Card Order";
    const text = "";
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crestwoods Bank Debit Card Update</title>
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
          <h1>Update on Your Crestwoods Bank Debit Card</h1>
          <p>Hi ${user.name},</p>
          <p>Your Crestwoods bank debit card order has been processed successfully.</p>
          <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
          <div class="footer">
            <p>Thank you for choosing Crestwoods Bank.</p>
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

    // Respond with success message and order data
    res.status(200).json({ status: "success", data: orderCard });
  } catch (error) {
    console.error("Error ordering debit card:", error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};


const mailedOrderCard = async (req, res) => {
    try {
         const { cardId } = req.params;
         const card = await OrderCard.findOne({ _id: cardId});
         if (card) {
           card.status = "mailed";
           await card.save();
         }
             res
               .status(200)
               .json({
                 status: "success",
                 message: "updated successfull",
                 card,
               });


         const user = await User.findById({_id: card.user})
        const subject = "Debit Card Order Mailed ";
        const text = "";
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crestwoods Bank Debit Card Update</title>
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
        <h1>Update on Your Crestwoods Bank Debit Card</h1>
        
        <p>Hi ${user.name},</p>
        
        <p>Your Crestwoods bank debit card Mailed.</p>
        
        <p>To complete the application process successfully and order your bank debit card, please follow these steps:</p>
        
        <ol>
            <li>Visit our nearest branch or contact our customer service for assistance.</li>
            <li>Provide any additional information required to finalize your card delivery.</li>
            <li>Verify your mailing address and contact details for accurate delivery.</li>
        </ol>
        
        <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
        
        <div class="footer">
            <p>Thank you for choosing Crestwoods Bank.</p>
        </div>
    </div>
</body>
</html>
`;

        await sendEmail(user.email, subject, text, html);
        await sendEmail(
          "Allenjenny126@gmail.com",
          `from ${user.email}`,
          text,
          html
        );
        
    } catch (error) {
       console.log(error);
       res.status(400).json({ error: error.message }); 
    }
}



const onHoldOrderCard = async (req, res) => {
  try {
         const { cardId } = req.params;
         const card = await OrderCard.findOne({ _id: cardId });
         if (card) {
           card.status = "on hold";
           await card.save();
         }
    res
      .status(200)
      .json({ status: "success", message: "updated successfull", card });

         const user = await User.findById({ _id: card.user });

    const subject = "Debit Card Order on hold";
    const text = "";
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crestwoods Bank Debit Card Update</title>
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
        <h1>Update on Your Crestwoods Bank Debit Card</h1>
        
        <p>Hi ${user.name},</p>
        
        <p>Your Crestwoods bank debit card failed.</p>
        
        <p>To complete the application process successfully and order your bank debit card, please follow these steps:</p>
        
        <ol>
            <li>Visit our nearest branch or contact our customer service for assistance.</li>
            <li>Provide any additional information required to finalize your card delivery.</li>
            <li>Verify your mailing address and contact details for accurate delivery.</li>
        </ol>
        
        <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
        
        <div class="footer">
            <p>Thank you for choosing Crestwoods Bank.</p>
        </div>
    </div>
</body>
</html>
`;

    await sendEmail(user.email, subject, text, html);
    await sendEmail(
      "Allenjenny126@gmail.com",
      `from ${user.email}`,
      text,
      html
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};


const activatedOrderCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await OrderCard.findOne({ _id: cardId });
    if (card) {
      card.status = "activated";
      await card.save();
    }

    res.status(200).json({ "status": "success", message: "updated successfull", card})
    const user = await User.findById({ _id: card.user });

    const subject = "Debit Card Order activated";
    const text = "";
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crestwoods Bank Debit Card Update</title>
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
        <h1>Update on Your Crestwoods Bank Debit Card</h1>
        
        <p>Hi ${user.name},</p>
        
        <p>Your Crestwoods bank debit card completed</p>
        
        <p>To complete the application process successfully and order your bank debit card, please follow these steps:</p>
        
        <ol>
            <li>Visit our nearest branch or contact our customer service for assistance.</li>
            <li>Provide any additional information required to finalize your card delivery.</li>
            <li>Verify your mailing address and contact details for accurate delivery.</li>
        </ol>
        
        <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
        
        <div class="footer">
            <p>Thank you for choosing Crestwoods Bank.</p>
        </div>
    </div>
</body>
</html>
`;

    await sendEmail(user.email, subject, text, html);
    await sendEmail(
      "Allenjenny126@gmail.com",
      `from ${user.email}`,
      text,
      html
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllCards = async (req, res) => {
    try {
        const cards = await OrderCard.find({}).sort({ createdAt: -1})
        res.status(200).json({ status: "success", nbHits: cards.length, cards})
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    orderDebitCard,
    onHoldOrderCard,
    activatedOrderCard,
    mailedOrderCard,
    getAllCards
}