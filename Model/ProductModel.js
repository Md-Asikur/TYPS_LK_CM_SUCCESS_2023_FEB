import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    numOfRatings: {
      type: String,
      default: 0,
    },
    ratings: {
      type: String,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
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
  },

  { timestamps: true }
);
export const Product = mongoose.model("product", productSchema)
//export default Product;