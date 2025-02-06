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
    const { role, dateStart, dateEnd, company } = req.body;
    const logo = req.file ? req.file.path : null;
    const desc = req.body.desc;

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
      desc,
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
    const { role, dateStart, dateEnd, company } = req.body;
    const desc = req.body.desc; // Ini akan menjadi array
    const logo = req.file ? req.file.path : null;

    // Pastikan field yang diperlukan ada
    if (!role || !dateStart || !dateEnd || !company || !desc) {
      return res
        .status(400)
        .json({ message: "Harap lengkapi semua data yang diperlukan." });
    }

    // Siapkan data yang akan diupdate
    let updatedData = {
      role,
      dateStart,
      dateEnd,
      company,
      desc: Array.isArray(desc) ? desc : [desc], // Pastikan desc adalah array
    };

    // Jika ada file logo baru, tambahkan ke data yang diupdate
    if (logo) {
      updatedData.logo = logo;
    }

    // Update data di database
    const work = await Work.findByIdAndUpdate(req.params.id, updatedData, {
      new: true, // Mengembalikan data yang sudah diupdate
      runValidators: true, // Menjalankan validasi schema
    });

    if (!work) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

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
