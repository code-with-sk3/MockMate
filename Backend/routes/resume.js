const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

router.post("/upload", upload.single("resume"), (req, res) => {
    res.send("Resume uploaded successfully");
});

module.exports = router;