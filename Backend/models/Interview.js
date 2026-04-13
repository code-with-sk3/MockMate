const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    resumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume"
    },
    questions: [String]
});

module.exports = mongoose.model("Interview", interviewSchema);