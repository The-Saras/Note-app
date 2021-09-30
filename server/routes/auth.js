const express = require("express");
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fetchUser  =require("../middleware/fetchUser")

const JWT_TOKEN = "india@won%goldmedal#in&olympic(*^&^"


//Create a user using POST "api/auth/createuser"
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'At least 5 charecters ').isLength({ min: 4 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Emial already in use" })
        }
        const salt = await bcrypt.genSalt(10);

        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_TOKEN);
        success = true;
        res.json({success, authtoken })
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error ocured")
    }
})


//Authenticate a user POST api/auth/login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;


    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Enter valid details" });

        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "Enter valid details" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_TOKEN);
        success = true;
        res.json({success, authtoken })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error ocured")
    }
})

//get user details with the token api/auth/getuser
router.post('/getuser',fetchUser, async (req, res) => {
    try 
    {
        userId = req.user.id;
        const user  = await User.findById(userId).select("-password");
        res.send(user)

    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error ocured")
    }
})

module.exports = router