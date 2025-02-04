const mongoose = require("mongoose");

const workSchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "tolong masukkan "],
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    desc: {
      type: [String],
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Work = mongoose.model("Work", workSchema);

module.exports = Work;
