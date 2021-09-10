//Schema Set Up - Keely
const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema(
    {
      author: { type: String, default: "anon" },
      title: { type: String, required: true },
      body: { type: String, required: true },
    },
    { timestamps: true }
  );

  const ReviewSchema = mongoose.Schema(
    {
      author: { type: String, default: "anon" },
      title: { type: String, required: true },
      body: { type: String, required: true },
    },
    { timestamps: true }
  );

const ListingSchema = mongoose.Schema({
    author: { type: String, default: "anonymous" },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    price:{type: Number, required: true},
    category:{type: String, required: true},
    comments: [CommentSchema],
    reviews: [ReviewSchema]
    },
    { timestamps: true}
);

module.exports = mongoose.model("Listing", ListingSchema);
