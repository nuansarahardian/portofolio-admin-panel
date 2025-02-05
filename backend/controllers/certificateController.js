const Certificate = require("../models/certificateModel");

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
    if (!certificate)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCertificate = async (req, res) => {
  try {
    const { title, year, company, category } = req.body;
    // Ambil path gambar yang di-upload
    const image = req.file ? req.file.path : null; // Menyimpan path file jika gambar di-upload

    // Membuat data sertifikat dengan gambar
    const certificate = new Certificate({
      title,
      year,
      company,
      category,
      image, // Menyimpan path gambar ke database
    });

    // Simpan certificate ke database
    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!certificate)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate)
      return res.status(404).json({ message: "Data tidak ditemukan" });
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
