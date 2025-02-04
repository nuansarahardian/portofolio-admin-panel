const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "tolong masukkan nama"],
    },
    desc: {
      type: String,
      required: true,
    },
    tech: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
