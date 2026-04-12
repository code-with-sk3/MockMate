const express = require("express");
const router = express.Router();
const fs = require("fs");

const upload = require("../middleware/upload");
const Resume = require("../models/resume");
const pdfParse = require("pdf-parse");

router.post("/upload", upload.single("resume"), async (req, res) => {
    try {

        const fileBuffer = fs.readFileSync(req.file.path);

        const data = await pdfParse(fileBuffer);

        const resume = new Resume({
            fileName: req.file.originalname,
            filePath: req.file.path,
            extractedText: data.text
        });
        await resume.save();
         res.send("Resume uploaded, text extracted, and saved successfully");
    } catch (error) {
        
        res.status(500).send("Error uploading resume");
    }
});

router.get("/all", async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.json(resumes);
    } catch (err) {
        console.log(err);
        res.send("Error fetching resumes");
    }
});

module.exports = router;