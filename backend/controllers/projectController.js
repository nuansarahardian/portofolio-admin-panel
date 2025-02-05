const Project = require("../models/projectModel");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, desc, tech, category, link } = req.body;
    const image = req.file ? req.file.path : null; // Simpan path gambar jika ada

    // Pastikan `tech` disimpan sebagai array
    const techArray = tech ? tech.split(",").map((item) => item.trim()) : [];

    // Validasi data yang diperlukan
    if (!title || !desc || techArray.length === 0 || !category || !link) {
      return res.status(400).json({ message: "Semua field harus diisi." });
    }

    // Buat instance baru dari model Project
    const project = new Project({
      title,
      desc,
      tech: techArray,
      category,
      link,
      image,
    });

    // Simpan ke database
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProject = async (req, res) => {
  try {
    // Ambil data proyek berdasarkan ID
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // Pastikan req.body tidak kosong
    if (Object.keys(req.body).length === 0 && !req.file) {
      return res.status(400).json({ message: "Tidak ada perubahan data" });
    }

    // Ambil data dari request
    const { title, desc, tech, category, link } = req.body;
    let updatedData = { title, desc, category, link };

    // Jika `tech` dikirim sebagai string, ubah menjadi array
    if (tech) {
      updatedData.tech = tech.split(",").map((item) => item.trim());
    }

    // Jika ada file yang diunggah, perbarui path gambar
    if (req.file) {
      updatedData.image = req.file.path;
    }

    // Update data proyek
    project = await Project.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
