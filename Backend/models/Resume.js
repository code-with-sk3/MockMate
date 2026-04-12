const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    fileName: String,
    filePath: String,
    extractedText: String
});

module.exports = mongoose.model('Resume', resumeSchema);