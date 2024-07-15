const Loan = require("../models/LoanModel");

const createLoan = async (req, res) => {
  try {
    
    const { amount, payback_period, reason, interest } = req.body;
    if (amount < 5000) {
      res.status(200).json({
        status: "failed",
        error: "you cannot request a loan less than $5000",
      });
    }
    if (payback_period === "3 months") {
      interest = amount * 0.02;
    } else if (payback_period === "6 months") {
      interest = amount * 0.04;
    } else if (payback_period === "1 year") {
        interest = amount * 0.06;
    } else if (payback_period === "2 years") {
        interest = amount * 0.08;
    } else if (payback_period === "3 years") {
        interest = amount * 0.1;
    }

    const loan = await Loan.create({
     user: req.user.userId,
      amount,
      payback_period,
      reason,
      interest,
    });
    res.status(200).json({ status: "success", message: "loan request made successfuly", loan})

  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createLoan,
};
