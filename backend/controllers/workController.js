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
    const { role, dateStart, dateEnd, company, desc } = req.body;
    const logo = req.file ? req.file.path : null;
    const descArray = desc ? desc.split(",").map((item) => item.trim()) : [];

    // Validate the necessary fields
    if (!role || !dateStart || !dateEnd || !company || !desc || !logo) {
      return res
        .status(400)
        .json({ message: "Harap lengkapi semua data yang diperlukan." });
    }

    // Create the work entry in the database
    const work = new Work({
      role,
      dateStart,
      dateEnd,
      company,
      desc: descArray,
      logo,
    });

    // Save the work entry
    await work.save();

    res.status(201).json(work);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateWork = async (req, res) => {
  try {
    const { role, dateStart, dateEnd, company, desc } = req.body;

    // Ensure the necessary fields are provided
    if (!role || !dateStart || !dateEnd || !company || !desc) {
      return res
        .status(400)
        .json({ message: "Harap lengkapi semua data yang diperlukan." });
    }

    // Handle the description by splitting and trimming
    const descArray = desc.split(",").map((item) => item.trim());

    // Prepare the updated data, including a logo if uploaded
    let updatedData = { role, dateStart, dateEnd, company, desc: descArray };

    // If a new logo file is uploaded, update the logo path
    if (req.file) {
      updatedData.logo = req.file.path;
    }

    // Find and update the work entry by ID
    const work = await Work.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
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

// Export all functions in a single object
module.exports = {
  getAllWorks,
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
};
