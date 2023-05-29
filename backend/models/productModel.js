import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter product description."],
    },
    price: {
      type: Number,
      required: [true, "Please enter product description."],
      maxLength: [7, "Price cannot exceed 7 characters."],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category."],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product description."],
      maxLength: [4, "Price cannot exceed 4 characters."],
      default: 1,
    },
    numOfReview: {
      type: Number,
      default: 0,
    },
    review: [
      {
        name: {
          type: String,
          require: true,
        },
        rating: {
          type: Number,
          require: true,
        },
        comment: {
          type: String,
          require: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
