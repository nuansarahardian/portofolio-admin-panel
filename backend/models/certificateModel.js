const mongoose = require("mongoose");

const certificateSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "tolong masukkan "],
    },
    company: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;
