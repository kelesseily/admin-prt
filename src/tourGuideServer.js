const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://nourhanmorad8:rz8REez3PEX4u5KD@cluster0.q2q36.mongodb.net/Trip_Saviour?retryWrites=true&w=majority")
    .then(() => {
        console.log('MongoDB connected successfully for Tour Guide');
        displayInitialData();  // Call the function to display initial data
    })
    .catch(err => console.log('MongoDB connection error: ', err));

const TourGuideModel = require("./models/Tourguide");

// Function to display initial data from tour_guide collection
async function displayInitialData() {
    try {
        const tourGuides = await TourGuideModel.find(); // Fetch all tour guides
        console.log("Current Tour Guides in Database:");
        console.log(tourGuides);
    } catch (err) {
        console.error('Error fetching initial data:', err);
    }
}

// Create or Update Profile
app.post("/tour_guide", async (req, res) => {
    try {
        const { username, email, password, age, mobileNumber, years_of_experience, previous_work, work_status } = req.body;

        // Check if the user exists 
        const existingTourGuide = await TourGuideModel.findOne({ username, email, password });

        if (existingTourGuide) {
            // User exists, update the existing profile with new fields
            existingTourGuide.age = age;
            existingTourGuide.mobileNumber = mobileNumber;
            existingTourGuide.years_of_experience = years_of_experience;
            existingTourGuide.previous_work = previous_work;
            existingTourGuide.work_status = work_status;

            await existingTourGuide.save();
            console.log("Profile updated:", existingTourGuide);  // Log the updated profile
            return res.status(200).json(existingTourGuide);
        }

        // If user does not exist, return an error message
        return res.status(404).json({ message: "User does not exist. Please check your credentials." });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server is not working" });
    }
});

// Read Profile by username, email, and password
// Read Profile by username, email, and password
app.get("/tour_guide", async (req, res) => {
    try {
        const tour_guides = await TourGuideModel.find();
        res.json(tour_guides);

        // Check if all parameters are provided
        const { username, email, password } = req.query;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Missing required query parameters." });
        }
            
        const tourguide = await TourGuideModel.findOne({ username, email, password });
        if (!tourguide) {
            return res.status(404).json({ message: "Tour guide not found. Please check your credentials." });
        }
        res.json(tourguide);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server is not working" });
    }
});


// Update Profile by username, email, and password
app.put("/tour_guide", async (req, res) => {
    try {
        const { username, email, password } = req.query; 

        // Find the tour guide using the provided credentials
        const updatedTourGuide = await TourGuideModel.findOneAndUpdate(
            { username, email, password },
            {
                // Update only the fields provided in the request body
                age: req.body.age,
                mobileNumber: req.body.mobileNumber,
                years_of_experience: req.body.years_of_experience,
                previous_work: req.body.previous_work,
                work_status: req.body.work_status
            },
            { new: true }  
        );

        if (!updatedTourGuide) {
            return res.status(404).json({ message: "Tour guide not found. Profile does not exist." });
        }

        console.log("Profile updated:", updatedTourGuide); // Log the updated profile
        res.json(updatedTourGuide);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server is not working" });
    }
});

// Start the Tour Guide server
app.listen(3002, () => { 
    console.log("Tour Guide Server Working on port 3002..."); 
});
