const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.send("Please enter all fields");
        }

        oldUser = await User.findOne({ email: email });

        if (oldUser) {
            return res.send("User already exists");
        }

        const newUser = new User({
            name: name,
            email: email,
            password: password
        });

        await newUser.save();

        res.send("User registered successfully");
    } catch (err) {
        console.log(err);
        res.send("Error in signup");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.send("Please enter all fields");
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.send("User not found");
        }

        if (user.password !== password) {
            return res.send("Wrong password");
        }

        res.send("Login successful");
    } catch (err) {
        console.log(err);
        res.send("Error in login");
    }
});

module.exports = router;