const mongoose = require("mongoose");

const heroSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    cv_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
