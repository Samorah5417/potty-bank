require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./db/connectDb");
const cors = require("cors");
const routeNotFound = require("./middleWare/notFound");
const userRoutes = require("./routes/userRoute");
const buyCryptoRoute = require("./routes/buyCryptoRoute");
const cardDepositRoute = require("./routes/cardDepositRoute");
const cryptoDepositRoute = require("./routes/cryptoDepositRoute");
const internalTransferRoute = require("./routes/internalTransferRoute");
const localTransferRoute = require("./routes/localTransferRoute");
const wireTransferRoute = require("./routes/wireTransferRoute");
const checkDepositRoute = require("./routes/checkDeposit");
const orderCardRoute = require("./routes/orderCardRoute");
const adminRoute = require("./routes/adminRoute");
const loanRoute = require("./routes/loanRoute");
const ticketRoute = require("./routes/ticketRoute");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(fileUpload({ useTempFiles: true }));
app.use(loanRoute);
app.use(userRoutes);
app.use(adminRoute);
app.use(ticketRoute);
app.use(buyCryptoRoute);
app.use(orderCardRoute);
app.use(cardDepositRoute);
app.use(checkDepositRoute);
app.use(wireTransferRoute);
app.use(cryptoDepositRoute);
app.use(localTransferRoute);
app.use(internalTransferRoute);

app.get("/", (req, res) => {
  res.status(200).send("greetings from cOdE mAnIa");
});

// app.use('/api/v1/users', require('./routes/userRoutes'))
app.use(routeNotFound);
const startDb = async () => {
  await connectDb(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`healthy server from port ${port}`);
  });
};

startDb();
