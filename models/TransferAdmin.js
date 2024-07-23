const { Schema, default: mongoose } = require("mongoose");

const TransferAdminSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: [true, "Enter the amount you want to send"],
    },
    name: {
      type: String,
    },
    madeBy: {
      type: String,
      default: "This transfer was made by the Admin",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
    account_number: {
      type: String,
      required: [true, "Enter account number"],
    },
    remarks: {
      type: String,
      default: "Transfer",
    },
    date: {
      type: String,
    },
    account: {
      type: String,
      required: [true, "Choose an account"],
      enum: {
        values: ["checkings", "savings"],
        message:
          " {VALUE} is not supported, it should be 'checkings' or 'savings'",
      },
    },
  },
  { timestamps: true }
);

TransferAdminSchema.pre("save", function (next) {
  this.date = this.createdAt; // Set 'date' to 'createdAt'
  next();
});

module.exports = mongoose.model("TransferAdmin", TransferAdminSchema);
