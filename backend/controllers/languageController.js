const Language = require("../models/languageModel");

const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.find({});
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLanguageById = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLanguage = async (req, res) => {
  try {
    const language = await Language.create(req.body);
    res.status(201).json(language);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLanguage = async (req, res) => {
  try {
    const language = await Language.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!language)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLanguage = async (req, res) => {
  try {
    const language = await Language.findByIdAndDelete(req.params.id);
    if (!language)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
