// External variables
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('strictQuery', false);
require("dotenv").config();
const {createProduct} = require("./Routes/productController");
const { register} = require("./Routes/registerController");
const MongoURI = process.env.MONGO_URI ;

const productModel = require('./Models/Product.js');

//App variables
const app = express();
const port = process.env.PORT || "8000";
const product = require('./Models/Product');
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
/*
                                                    Start of your code
*/
app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
  });

// #Routing to userController here
app.use(cors())
app.use(express.json())
app.post("/addProduct",createProduct);

app.post("/register", register);




/*
                                                    End of your code
*/

