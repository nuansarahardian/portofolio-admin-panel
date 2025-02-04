const Work = require("../models/workModel");

const getAllWorks = async (req, res) => {
  try {
    const works = await Work.find({});
    res.status(200).json(works);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWorkById = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(work);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createWork = async (req, res) => {
  try {
    const work = await Work.create(req.body);
    res.status(201).json(work);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateWork = async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!work) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(work);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteWork = async (req, res) => {
  try {
    const work = await Work.findByIdAndDelete(req.params.id);
    if (!work) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllWorks,
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
};
