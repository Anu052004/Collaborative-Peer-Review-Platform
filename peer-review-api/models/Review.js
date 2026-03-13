
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        required: true
    },
    reviewerId: {
        type: String,
        required: true
    },
    rubricScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    feedback: {
        type: String
    },
    reviewDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Review", ReviewSchema);
