const Tool = require("../models/toolModel");

const getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find({});
    res.status(200).json(tools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getToolById = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(tool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTool = async (req, res) => {
  try {
    const tool = await Tool.create(req.body);
    res.status(201).json(tool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tool) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(tool);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);
    if (!tool) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTools,
  getToolById,
  createTool,
  updateTool,
  deleteTool,
};
