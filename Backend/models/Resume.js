const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    fileName: String,
    filePath: String,
    extractedText: String,
    userEmail: {
    type: String,
    required: true
}
});

module.exports = mongoose.model('Resume', resumeSchema);