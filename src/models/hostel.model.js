import Joi from "joi";
import mongoose from "mongoose";
const lanlordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    university: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },

    roomtype: {
      type: String,
      enum: ["self contain", "room and parlour", "2 bedroom"],
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      //since we have multiple upload in frontend
      type: [String],
      required: true,
    },
    lanlordid: {
      //connect the hostel uploaded to the lanlord that created it
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model("lanlord", lanlordSchema);
