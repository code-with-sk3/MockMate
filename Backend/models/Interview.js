const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume"
    },
    questions: [String],
    answers: [String],
    feedback: {
        score: {
            type: Number,
            default: 0
        },
        strengths: {
            type: [String],
            default: []
        },
        weaknesses: {
            type: [String],
            default: []
        },
        suggestions: {
            type: [String],
            default: []
        }
    }
});

module.exports = mongoose.model("Interview", interviewSchema);