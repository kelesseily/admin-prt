const mongoose = require("mongoose");

const TourGuideSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },  // If age is mandatory
    mobileNumber: { type: String, required: true },  // Changed to String
    years_of_experience: { type: Number, default: 0 }, // Default to 0 if not provided
    previous_work: { type: String }, // This can be optional
    work_status: { type: String, default: "Rejected" }
}, { collection: 'tour_guide' });

const TourGuideModel = mongoose.model("Tourguide", TourGuideSchema);
module.exports = TourGuideModel;
