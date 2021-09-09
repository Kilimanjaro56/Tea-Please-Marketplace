const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to database...");
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const Listing = require("./models/Listing");

//END POINTS HERE
app.post("/create-listing", async (req, res, next) => {
  try{const listing = new Listing({
      author:req.body.author,
      title:req.body.title,
      imageUrl:req.body.imageUrl,
      description:req.body.description,
      price:req.body.price,
      category:req.body.category,
    });
    console.log(listing)
    const savedListing = await listing.save(); 
    res.json(savedListing);
  }catch(error){
    console.error(error)
  }
  });