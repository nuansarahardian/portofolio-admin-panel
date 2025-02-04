const mongoose = require("mongoose");

const toolSchema = mongoose.Schema(
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
const Tool = mongoose.model("Tool", toolSchema);

module.exports = Tool;
