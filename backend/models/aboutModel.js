const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema(
  {
    self_desc: {
      type: String,
      required: [true, "tolong masukkan nama"],
    },
    location: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    experience_desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const About = mongoose.model("About", aboutSchema);

module.exports = About;
