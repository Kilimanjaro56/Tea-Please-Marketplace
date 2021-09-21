// Initial Set Up - Keely
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
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

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(morgan("dev"));
app.use(cookieParser());

//Route Protection - Keely
const authUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if(!token){
    console.log('No Token');
    return res.status(401).json({message: 'Access Denied'});
  } else {
    jwt.verify(token, 'secretKey', (err, decodedToken) => {
      if(err) {
        console.log(err);
        return res.status(500).json({message: err.message});
      } else {
        req.userId = decodedToken.id;
        req.userName = decodedToken.name;
        next();
      }
    });
  }
};

// END POINTS HERE
const Listing = require("./models/Listing");

// VIEW LIST TESTING FOR FILTER -Keely
app.get("/listings", async (req, res) => {
  const listings = await Listing.find().populate('author', 'name');
  res.status(200).json(listings);
});

//Get User Profile - Keely
app.get("/profile/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user);
});

//User Biography - Keely
app.patch("/profile/:userId", async (req, res) => {
try{
  const userData = {
    bio: req.body.bio
  };
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    userData
  );
  res.status(200).json(updatedUser);
} catch (error) {
  console.log(error);
}
});

//Get Single Post End Point - Keely
app.get("/listings/:listingId", async (req, res) => {
  const listing = await Listing.findById(req.params.listingId).populate('author', 'name');
  res.status(200).json(listing);
});

//For Sale/ Sold endpoint - Keely

app.patch("/listings/:listingId/sold", async (req, res) => {
try{
  const listingData = {
    isAvaliable: req.body.isAvaliable
  };
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.listingId,
    listingData
  );
  res.status(200).json(updatedListing);
} catch (error) {
  console.log(error);
}
});

//Comments End Point - Annabel
app.post("/listings/:listingId/comments", authUser,async (req, res, next)=>{
  try{
      const listing = await Listing.findById(req.params.listingId);
      listing.comments.push({
        author: req.userId,
        name: req.userName,
        body: req.body.body,
      }
    )
    console.log(listing)
    const savedListing = await listing.save();
    res.status(200).json(listing);
  }catch (error) {
    console.log(error);
  }
});

//Reviews - Keely
app.post("/listings/:listingId/reviews", authUser, async (req, res) => {
 try{
  const listing = await Listing.findById(req.params.listingId);
  listing.reviews.push(
  {
    author: req.userId,
    name: req.userName,
    body: req.body.body,
  })
  const savedListing = await listing.save();
  res.status(200).json(listing);
  }catch (error){
    console.log(error);
  }
});

//Post End Point - Keely
app.post("/create-listing", authUser, async (req, res, next) => {
  try {
    const listing = new Listing({
      author: req.userId,
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      isAvaliable: req.body.isAvaliable,
    });
    console.log(listing);
    const savedListing = await listing.save();
    res.json(savedListing);
  } catch (error) {
    console.error(error);
  }
});

//Delete End Point - Annabel
app.delete("/listings/edit/:listingId", async (req, res, next) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(
      req.params.listingId
    );
    res.status(200).json(deletedListing);
  } catch (err) {
    next(err);
  }
});

  app.patch("/listings/edit/:listingId", async (req, res, next) => {
    try {
      const listingData = {
        author: req.body.author,
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
      };
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.listingId,
        listingData
      );
      res.json(updatedListing);
    } catch (error) {
      next(error);
    }
  });

//User Schema - Keely
const User = require("./models/User");

//User Registration - Keely
app.post("/signup", async (req, res, next) => {
  try {
    const existingsUser = await User.findOne({ email: req.body.email });
    if (existingsUser) {
      return res
        .status(409)
        .json({ message: "This email already exists, log in below" });
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

//Log In - Keely
app.post("/login", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    return res.status(401).json({ message: "Authenticaton Failed" });
  } else {
    bcrypt.compare(req.body.password, existingUser.password, (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Authentication Failed" });
      } else {
        if (result) {
          const lifespan = 1 * 60 * 60;
          const token = jwt.sign(
            { id: existingUser._id, name: existingUser.name , email: existingUser.email },
            "secretKey",
            { expiresIn: lifespan }
          );
          res.cookie("jwt", token, { maxAge: lifespan * 1000, httpOnly : true});
          res.status(200).json({email: existingUser.email, id: existingUser._id})
        } else {
          res.status(401).json({ message: "Authentication Failed" });
        }
      }
    });
  }
});
//Log Out - Keely
app.get("/logout", async (req, res) => {
  res.cookie("jwt", "", {maxAge: 1});
  res.json({message: 'logged Out'});
});
