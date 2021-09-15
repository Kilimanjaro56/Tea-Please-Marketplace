//Schema Set Up - Keely
const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema(
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
      body: { type: String, required: true },
    },
    { timestamps: true }
  );

  const ReviewSchema = mongoose.Schema(
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      body: { type: String, required: true },
    },
    { timestamps: true }
  );

const ListingSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    price:{type: Number, required: true},
    category:{type: String, required: true},
    isActive:{type: Boolean, required: true, default: true},
    comments: [CommentSchema],
    reviews: [ReviewSchema]
    },
    { timestamps: true}
);

module.exports = mongoose.model("Listing", ListingSchema);
