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
            questions: questions,
            answers: []
       });

        await newInterview.save();

        res.json(newInterview);

    } catch (err) {
        console.log(err);
        res.send("Error generating questions");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.send("Interview not found");
        }

        res.json(interview);
    } catch (err) {
        console.log(err);
        res.send("Error fetching interview");
    }
});

router.post("/answer/:id", async (req, res) => {
    try {
        const { answers } = req.body;

        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.send("Interview not found");
        }

        interview.answers = answers;

        await interview.save();

        res.send("Answers saved successfully");
    } catch (err) {
        console.log(err);
        res.send("Error saving answers");
    }
});

router.post("/feedback/:id", async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.send("Interview not found");
        }

        const answers = interview.answers;

        let score = 0;
        let strengths = [];
        let weaknesses = [];
        let suggestions = [];

        if (answers.length === 0) {
            score = 0;
            weaknesses.push("No answers were submitted");
            suggestions.push("Please answer the interview questions");
        } else {
            let totalLength = 0;

            for (let answer of answers) {
                totalLength += answer.length;
            }

            let averageLength = totalLength / answers.length;

            if (averageLength > 80) {
                score = 8;
                strengths.push("Answers are detailed");
                strengths.push("Good effort in explaining concepts");
                suggestions.push("Add real project examples to make answers stronger");
            } else if (averageLength > 30) {
                score = 6;
                strengths.push("Answers are okay");
                weaknesses.push("Some answers are too short");
                suggestions.push("Try to explain answers in more detail");
            } else {
                score = 4;
                weaknesses.push("Answers are very short");
                weaknesses.push("Concept explanation is weak");
                suggestions.push("Practice explaining concepts clearly");
                suggestions.push("Try to answer with examples");
            }
        }

        interview.feedback = {
            score,
            strengths,
            weaknesses,
            suggestions
        };

        await interview.save();

        res.json(interview.feedback);

    } catch (err) {
        console.log(err);
        res.send("Error generating feedback");
    }
});

module.exports = router;