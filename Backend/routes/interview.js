const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const express = require("express");
const router = express.Router();

const Resume = require("../models/resume");
const Interview = require("../models/Interview");

router.post("/questions/:id", async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const prompt = `
You are an interview question generator.

Read the following resume text and generate 5 interview questions.

Rules:
- Questions should be clear and simple
- Questions should be based on skills, projects, and technologies in the resume
- Return only valid JSON
- Format:
{
  "questions": [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5"
  ]
}

Resume text:
${resume.extractedText}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
       });

        const aiText = response.text;

        let parsedData;

        try {
            const cleaned = aiText.replace(/```json|```/g, "").trim();
            parsedData = JSON.parse(cleaned);
        } catch (err) {
            return res.status(500).json({
                message: "AI returned invalid JSON",
                raw: aiText
            });
        }

        const newInterview = new Interview({
            resumeId: resume._id,
            questions: parsedData.questions || [],
            answers: [],
            feedback: {
                score: 0,
                strengths: [],
                weaknesses: [],
                suggestions: []
            }
        });

        await newInterview.save();

        res.json(newInterview);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error generating AI questions"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id);

        if (!interview) {
            return res.status(404).json({
                message: "Interview not found"
            });
        }

        const response = {
            interviewId: interview._id,
            resumeId: interview.resumeId,
            questions: interview.questions || [],
            answers: interview.answers || [],
            feedback: interview.feedback || {
                score: 0,
                strengths: [],
                weaknesses: [],
                suggestions: []
            }
        };

        res.json({
            success: true,
            data: response
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error fetching interview"
        });
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

        const qaText = interview.questions.map((q, i) => {
            return `Question ${i + 1}: ${q}\nAnswer ${i + 1}: ${interview.answers[i] || "No answer provided"}`;
        }).join("\n\n");

        const prompt = `
You are an interview evaluator.

Analyze these interview questions and answers.

Return feedback in valid JSON format like this:
{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Interview data:
${qaText}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        const aiText = response.text;

        

        let parsedFeedback;

        try {
            const cleaned = aiText.replace(/```json|```/g, "").trim();
            parsedFeedback = JSON.parse(cleaned);
        } catch (err) {
            return res.status(500).json({
                message: "AI returned invalid JSON",
                raw: aiText
            });
        }

        interview.feedback = parsedFeedback;
        await interview.save();

        res.json({
            message: "Feedback generated successfully",
            feedback: parsedFeedback
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error generating AI feedback");
    }
});

module.exports = router;