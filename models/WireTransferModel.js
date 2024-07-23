const { Schema, model } = require("mongoose");

const WireTransferSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    account: {
      type: String,
      required: [true, "Please choose an account"],
      enum: {
        values: ["checkings", "savings"],
        message: "{VALUE} is not supported",
      },
    },
    date: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "Please enter amount to send"],
      min: [10, "You cannot send less than $10"],
    },
    acct: {
      type: String,
      required: [true, "Please enter an account number"],
    },
    bank: {
      type: String,
      required: [true, "Please enter a bank"],
    },

    routing: {
      type: String,
      required: [true, "Please enter routing transit number"],
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);


WireTransferSchema.pre("save", function (next) {
  this.date = this.createdAt; // Set 'date' to 'createdAt'
  next();
});


module.exports = model("WireTransfer", WireTransferSchema);
