const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      validate: [isEmail, "Please enter a valid email"],
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    dob: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not supported",
      },
      required: [true, "Gender is required"],
    },
    ssn: {
      type: String,
      required: [true, "SSN or tax ID is required"],
    },
    occupation: {
      type: String,
      required: [true, "Occupation is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    zip: {
      type: String,
      required: [true, "ZIP code is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    nok_name: {
      type: String,
      required: [true, "Name of kin is required"],
    },
    nok_email: {
      type: String,
      required: [true, "Email of kin is required"],
    },
    nok_phone: {
      type: String,
      required: [true, "Phone of kin is required"],
    },
    nok_relationship: {
      type: String,
      required: [true, "Relationship of kin is required"],
    },
    currency: {
      type: String,
      required: [true, "Account currency is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    pin: {
      type: String,
      required: [true, "PIN is required"],
    },
    cardStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
    // passport: {
    //   type: String,
    //   required: [true, "Please upload a passport photograph"],
    // },
    // kyc: {
    //   type: String,
    //   required: [true, "Please upload an identification photograph"],
    // },
    checkings_balance: {
      type: Number,
      default: 0,
    },
    savings_balance: {
      type: Number,
      default: 0,
    },
    checkings_account_number: {
      type: String,
      required: true,
    },

    savings_account_number: {
      type: String,
      required: true,
    },
    routing_number: {
      type: String,
      required: true,
    },
    card_number: {
      type: String,
      required: true,
    },
    expiring_date: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: [true, "Cannot bypass role"],
      default: "user",
    },
  },
  { timestamps: true }
);


UserSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// UserSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     const hashedPin = await bcrypt.hash(this.pin, 10);
//     this.password = hashedPassword;
//     this.pin = hashedPin;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     const isPasswordMatch = await bcrypt.compare(
//       candidatePassword,
//       this.password
//     );
//     return isPasswordMatch;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// UserSchema.methods.comparePin = async function (candidatePin) {
//   try {
//     const isPinMatch = await bcrypt.compare(candidatePin, this.pin);
//     return isPinMatch;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

module.exports = mongoose.model("User", UserSchema);
