const Certificate = require("../models/certificateModel");
const fs = require("fs"); // Untuk menghapus file lama jika ada

const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({});
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCertificate = async (req, res) => {
  try {
    const { title, year, company, category } = req.body;
    const image = req.file ? req.file.path : null; // Simpan path gambar jika ada

    const certificate = new Certificate({
      title,
      year,
      company,
      category,
      image,
    });

    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const { title, year, company, category } = req.body;
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // Jika ada file gambar baru, hapus gambar lama
    let updatedImage = certificate.image;
    if (req.file) {
      if (certificate.image) {
        fs.unlinkSync(certificate.image); // Hapus file lama dari server
      }
      updatedImage = req.file.path;
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      {
        title,
        year,
        company,
        category,
        image: updatedImage,
      },
      { new: true }
    );

    res.status(200).json(updatedCertificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // Hapus gambar terkait jika ada
    if (certificate.image) {
      fs.unlinkSync(certificate.image);
    }

    await Certificate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
