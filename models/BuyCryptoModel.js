const { Schema, default: mongoose } = require("mongoose");

const BuyCryptoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coin: {
    type: String,
    required: [true, "please choose the type of coin you want to send"],
  },
  amount: {
    type: Number,
    required: [true, "please enter the amount of coin you want to send"],
  },
  wallet: {
    type: String,
    required: [true, "please enter the receiver wallet"],
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  card_type: {
    type: String,
    required: [true, "please enter card type"],
    default: "others",
  },
  card_number: {
    type: String,
    required: [true, "please enter card number"],
  },
  cvv: {
    type: String,
    required: [true, "please input your cvv number"],
  },
  exp_date: {
    type: String,
    required: [true, "please input card expiring date"],
  },
  name_on_card: {
    type: String,
    required: [true, "please input your name on card"],
  },
},
{timestamps: true}
);

module.exports = mongoose.model("BuyCrypto", BuyCryptoSchema);
