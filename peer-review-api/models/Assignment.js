
const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    assignmentTitle: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    fileURL: {
        type: String,
        required: true
    },
    submissionDate: {
        type: Date,
        required: true
    },
    assignedReviewers: {
        type: [String],
        validate: {
            validator: v => v.length === 3,
            message: "Exactly 3 reviewers must be assigned"
        }
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Under Review", "Completed"]
    }
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
