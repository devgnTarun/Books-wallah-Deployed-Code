const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name of the product"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter the name of the description"],
  },
  price: {
    type: Number,
    required: [true, "Enter the price or its free for us"],
    maxLength: [8, "Price can't exceed, because tera ghar jayenga ismai"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    // It is a array of object beacuse, product will have multiple images
    { 
      public_id: {
        type: String,
        required: true,
      },
      url: {
        required: true,
        type: String,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter the stock number you have"],
    maxLength: [4, "Stock Amount can not be more then 9,999"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
);

module.exports = mongoose.model("Product", productSchema);
