const mongoose = require("mongoose");

const languageSchema = mongoose.Schema(
  {
    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Language = mongoose.model("Language", languageSchema);

module.exports = Language;
