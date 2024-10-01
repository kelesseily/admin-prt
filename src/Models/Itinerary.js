const mongoose=require("mongoose")
const ItinerarySchema=new mongoose.Schema({ tourGuideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourguide', required: true },activities:{type:[String]}, locationToBeVisited:{type:String},
timeline:{type:String},durationOfActivity:{type:Number},languageOfTour:{type:String}, price: { type: Number},date_time:{type:String},
accesibility:{type:String},pickupLocation:{type:String},dropoffLocation:{type:String},
booked:{type:Boolean}},{ collection: 'itinerary' ,timestamps: true})

const ItineraryModel=mongoose.model("Itinerary",ItinerarySchema)
module.exports=ItineraryModel