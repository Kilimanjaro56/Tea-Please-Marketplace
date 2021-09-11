//Initial Set Up - Keely
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
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
app.use(morgan("dev"));

const Listing = require("./models/Listing");

//END POINTS HERE

//Get Single Post End Point - Keely
app.get("/listings/:listingId", async (req, res) => {
  const listing = await Listing.findById(req.params.listingId);
  res.status(200).json(listing);
});

//Post End Point - Keely
app.post("/create-listing", async (req, res, next) => {
  try {
    const listing = new Listing({
      author: req.body.author,
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    });
    console.log(listing);
    const savedListing = await listing.save();
    res.json(savedListing);
  } catch (error) {
    console.error(error);
  }
});

//Delete Functionality - Annabel
app.delete("/listings/edit/:listingId", async (req, res) => {
  const deletedListing = await Listing.findByIdAndDelete(req.params.listingId);
  res.status(200).json(deletedListing);
});


//User Schema - Keely
const User = require("./models/User");

//User Registration - Keely
app.post("/signup", async (req, res, next) => {
  try {
    const existingsUser = await User.findOne({ email: req.body.email });
    if (existingsUser) {
      return res.status(409).json({ message: "This email already exists, log in below" });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          const user = new User({
            name: req.body.name,
            password: hash,
            email: req.body.email,
          });
          const savedUser = await user.save();
          res.json(savedUser);
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
});
