const express = require("express");
const router = express.Router();

const Resume = require("../models/resume");
const Interview = require("../models/Interview");

router.post("/questions/:id", async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.send("Resume not found");
        }

        const text = resume.extractedText.toLowerCase();

        let questions = [];

        if (text.includes("react")) {
            questions.push("What is React?");
            questions.push("What are React hooks?");
        }

        if (text.includes("node")) {
            questions.push("What is Node.js?");
            questions.push("What is Express?");
        }

        if (text.includes("mongodb")) {
            questions.push("What is MongoDB?");
            questions.push("What is Mongoose?");
        }

        if (questions.length === 0) {
            questions.push("Tell me about yourself.");
            questions.push("Explain your projects.");
        }

        const newInterview = new Interview({
            resumeId: resume._id,
            questions: questions
        });

        await newInterview.save();

        res.json(newInterview);

    } catch (err) {
        console.log(err);
        res.send("Error generating questions");
    }
});

module.exports = router;