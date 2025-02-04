const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
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
const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
