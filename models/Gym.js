const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    plan: {
      type: String,
      enum: ["FREE", "BASIC", "PRO"],
      default: "FREE",
    },

    subscriptionEnd: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gym", GymSchema);
