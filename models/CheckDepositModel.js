const { Schema, default: mongoose } = require("mongoose");

const CheckDepositSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    front_check: {
      type: String,
      required: [true, "please upload front image of your check"],
    },
    back_check: {
      type: String,
      required: [true, "please upload back image of your check"],
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


module.exports = mongoose.model('CheckDeposit', CheckDepositSchema)