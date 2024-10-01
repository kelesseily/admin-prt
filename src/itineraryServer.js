const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

mongoose.connect("mongodb+srv://nourhanmorad8:rz8REez3PEX4u5KD@cluster0.q2q36.mongodb.net/Trip_Saviour?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB connected successfully for Itinerary'))
    .catch(err => console.log('MongoDB connection error: ', err));

const ItineraryModel = require("./models/Itinerary");

// Create Itinerary
app.post("/itinerary", async (req, res) => {
    try {
        const {
            tourGuideId,
            activities,
            locationToBeVisited,
            timeline,
            durationOfActivity,
            languageOfTour,
            price,
            date_time,
            accessibility,
            pickupLocation,
            dropoffLocation,
            booked
        } = req.body;

        // Create a new itinerary 
        const createdItinerary = new ItineraryModel({
            tourGuideId,
            activities,
            locationToBeVisited,
            timeline,
            durationOfActivity,
            languageOfTour,
            price,
            date_time,
            accessibility,
            pickupLocation,
            dropoffLocation,
            booked
        });

        // Add the itinerary to the database
        const addItinerary = await createdItinerary.save();
         
        console.log("Itinerary created successfully:", addItinerary);
        
        res.status(201).json(addItinerary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while creating itinerary" });
    }
});

// Read itinerary
app.get("/itinerary", async (req, res) => {
    try {
        const itineraries = await ItineraryModel.find();
        res.json(itineraries);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while fetching itineraries" });
    }
});

app.delete("/itinerary/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the itinerary
        const deletedItinerary = await ItineraryModel.findByIdAndDelete(id);

        if (!deletedItinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        console.log("Itinerary deleted successfully:", deletedItinerary);
        res.json({ message: "Itinerary deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while deleting itinerary" });
    }
});


app.put("/itinerary/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            tourGuideId,
            activities,
            locationToBeVisited,
            timeline,
            durationOfActivity,
            languageOfTour,
            price,
            date_time,
            accessibility,
            pickupLocation,
            dropoffLocation,
            booked
        } = req.body;

        // Find and update the itinerary
        const updatedItinerary = await ItineraryModel.findByIdAndUpdate(
            id,
            {
                tourGuideId,
                activities,
                locationToBeVisited,
                timeline,
                durationOfActivity,
                languageOfTour,
                price,
                date_time,
                accessibility,
                pickupLocation,
                dropoffLocation,
                booked
            },
            { new: true } // Return the updated document
        );

        if (!updatedItinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        console.log("Itinerary updated successfully:", updatedItinerary);
        res.json(updatedItinerary);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while updating itinerary" });
    }
});


// Start the Itinerary server
app.listen(3002, () => { 
    console.log("Itinerary Server Working on port 3002..."); 
});
