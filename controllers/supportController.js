const Ticket = require('../models/supportModel')
const User = require('../models/UserModel')
const { handleError } = require("../utils/handleError");

const  sendMail  = require("../utils/emailSender");
const createTicket = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const ticket = await Ticket.create(req.body);

    console.log(ticket);
    // Send response after ticket creation
    res.status(200).json({
      status: "success",
      message: "Ticket successfully created",
      ticket,
    });

    // Fetch user details asynchronously
    const user = await User.findById(ticket.user);

    // Prepare email content
    const subject = "Ticket Creation Confirmation";
    const text = `Hi ${user.name},\n\nYour ticket has been created successfully. We will get back to you shortly.`;
    const html = `<p>Hi ${user.name},</p><p>Your ticket has been created successfully. We will get back to you shortly.</p>`;

    const html2 = `<p>Hi ${user.name} with ${user.email},</p><p> created a ticket. Please get back to the author.</p>`;

    // Send emails asynchronously
    // await sendMail(user.email, subject, text, html);
    await sendMail(process.env.EMAIL, subject, text, html2);
  } catch (error) {
    const errors = handleError(error)
    console.error("Error creating ticket:", error);
    res.status(400).json({ error: errors });
  }
};


const getTicketUser = async(req, res) => {
    try {
         const ticket = await Ticket.find({
           user: req.user.userId,
         });
         console.log(req.user.userId);
         console.log(ticket);
         res.status(200).json({
           status: "success",
           nbHits: ticket.length,
           data: ticket,
         });
    } catch (error) {
       res.status(400).json({ error: error.message }); 
    }
}

const getTicketAdmin = async (req, res) => {
  try {
    const ticket = await Ticket.find({});
    res.status(200).json({
      status: "success",
      nbHits: userticket.length,
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    createTicket,
    getTicketUser,
    getTicketAdmin
}