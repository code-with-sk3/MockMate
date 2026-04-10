const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware (to read JSON data)
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("MockMate backend running");
});

// connect database
mongoose.connect("mongodb://127.0.0.1:27017/mockmate")
.then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
})
.catch((err) => {
    console.log(err);
});