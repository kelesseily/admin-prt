const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdvertiserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true } // Changed from Number to String
});

// Hash the password before saving
AdvertiserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const AdvertiserModel = mongoose.model("Advertiser", AdvertiserSchema);
module.exports = AdvertiserModel;

