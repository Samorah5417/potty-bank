const { Schema, default: mongoose } = require("mongoose");

const TransferAdminSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    required: [true, "Weerey enter the amount wey u wan send"],
  },

  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "completed",
  },
  account_number: {
    type: String,
    required: [true, 'weerey enter account number']
  },
  account: {
    type: String,
    required: [true, "weerey choose an account"],
    enum: {
      values: ["checkings", "savings"],
      message: "weerey {VALUE} is not supported, na checkings or savings",
    },
  },
},

{timestamps: true}
);

module.exports = mongoose.model("TransferAdmin", TransferAdminSchema);
