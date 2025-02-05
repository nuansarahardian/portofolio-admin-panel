const About = require("../models/aboutModel");

// Mendapatkan semua data About
const getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.find({});
    res.status(200).json(abouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan satu data About berdasarkan ID
const getAboutById = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menambahkan data About baru
const createAbout = async (req, res) => {
  try {
    const about = await About.create(req.body);
    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mengupdate data About berdasarkan ID
const updateAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!about)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menghapus data About berdasarkan ID
const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID yang diterima untuk dihapus:", id);

    const deletedAbout = await About.findByIdAndDelete(id);
    if (!deletedAbout) {
      return res.status(404).json({ message: "About not found" });
    }

    res.status(200).json({ message: "About deleted successfully" });
  } catch (error) {
    console.error("Error di backend:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  getAllAbouts,
  getAboutById,
  createAbout,
  updateAbout,
  deleteAbout,
};
