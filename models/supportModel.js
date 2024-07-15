const { Schema , default: mongoose } = require('mongoose');

const SupportSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
        type: String,
        enum: ['opened', 'closed', 'under review'],
        default: 'opened'
    },
    dept: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', SupportSchema)