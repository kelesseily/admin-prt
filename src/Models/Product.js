const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
  },
sellerId: {
    //lsa mhtag advertiser schema
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
    },
  Ratings: {
    type: String,
  },
  Reviews: {
    type: String,
  },
  Price: {
    type: Number,
    },
  Quantity: {
    type: Number,
    required: true,
  },
  Picture: {
    type: String,  // URL or path to the image
    // Make it required if you want all products to have an image
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;