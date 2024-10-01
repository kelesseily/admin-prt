const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const guestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    nationality: { type: String, required: true },
    dob: { type: Date, required: true },
    obStatus: { type: String, required: true },
}, { timestamps: true });

// Prevent DOB from being changed
guestSchema.path('dob').set(function (value) {
    if (this.isNew) return value;
    return this.dob; // Once set, the DOB cannot be changed
});

// Hash the password before saving
guestSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Check if the user is at least 18 years old
guestSchema.methods.isAdult = function () {
    const today = new Date();
    const age = today.getFullYear() - this.dob.getFullYear();
    return age >= 18;
};



const guestModel = mongoose.model("Guest", guestSchema);
module.exports = guestModel;

