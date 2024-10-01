const guestModel = require('../Models/guest')
const sellerModel = require('../Models/seller')
const advertiserModel = require('../Models/Advertiser')
const tourguideModel = require('../Models/Tourguide')
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


const register  = async (req, res) => {
    console.log(req.body);
    const {  email, username, password, mobile, nationality, dob, jobStatus, role } = req.body;

    // Check if all required fields are provided
    if ( !email || !username || !password || !mobile || !nationality || !dob || !jobStatus || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user is at least 18 years old
    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < 18) {
        return res.status(400).json({ error: "You must be at least 18 years old to register." });
    }

    try {
        // Check if the email or username already exists across all models
        const existingUser = await guestModel.findOne({ $or: [{ email }, { username }] })
            || await sellerModel.findOne({ $or: [{ email }, { username }] })
            || await advertiserModel.findOne({ $or: [{ email }, { username }] })
            || await tourguideModel.findOne({ $or: [{ email }, { username }] });
        
        if (existingUser) {
            return res.status(400).json({ error: "Email or username already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user based on role
        let newUser;
        if (role === "seller") {
            newUser = new sellerModel({ username, email, password: hashedPassword });
        } else if (role === "advertiser") {
            newUser = new advertiserModel({ username, email, password: hashedPassword });
        } else if (role === "tourguide") {
            newUser = new tourguideModel({ username, email, password: hashedPassword });
        } else if (role === "guest") {
            newUser = new guestModel({ email, username, password: hashedPassword, mobile, nationality, dob: dobDate, jobStatus });
        } else {
            return res.status(400).json({ error: "Invalid role specified." });
        }

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// const registerTourist = async (req, res) => {
//     const { name, email, username, password, mobile, nationality, dob, jobStatus } = req.body;

//     // Validate required fields
//     if (!name || !email || !username || !password || !mobile || !nationality || !dob || !jobStatus) {
//         return res.status(400).json({ success: false, message: 'All fields are required.' });
//     }

//     // Check if user already exists
//     const userExists = users.find(user => user.email === email || user.username === username);
//     if (userExists) {
//         return res.status(400).json({ success: false, message: 'User already exists.' });
//     }

//     // Create new user (without encryption)
//     const newUser = new guestModel({
//         name,
//         email,
//         username,
//         password, // Storing password in plain text (NOT recommended)
//         mobile,
//         nationality,
//         dob,
//         jobStatus
//     });

    // Save user to the mock database

    // Respond with success
//     res.status(201).json({ success: true, message: 'Tourist registered successfully!', user: newUser });

// };

module.exports = {  register };




