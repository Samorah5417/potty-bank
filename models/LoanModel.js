const { Schema, default: mongoose, mongo} = require('mongoose');

const LoanSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: [true, 'please enter Loan amount'],
        min: [5000, 'you cannot request a loan less than $5,000']
    },
    name: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: [true, 'please enter Loan reason']
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'failed', 'approved'],
            message: '{VALUE} is not supported'
        },
        default: 'pending'
    },
    payback_period: {
        type: String,
        enum: {
            values: ['3 months', '6 months', '1 year', '2 years', '3 years']
        },
        required: [true, 'please enter payback period']
    },
    interest: {
        type: Number,
        required: true,
        default: 0
    }
},
{ timestamps: true}
)

module.exports = mongoose.model('Loan', LoanSchema)