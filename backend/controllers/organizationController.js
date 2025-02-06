const Organization = require("../models/organizationModel");

const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({});
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrganization = async (req, res) => {
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

    // Create the organization entry in the database
    const organization = new Organization({
      role,
      dateStart,
      dateEnd,
      company,
      desc,
      logo,
    });

    // Save the organization entry
    await organization.save();

    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrganization = async (req, res) => {
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
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true, // Mengembalikan data yang sudah diupdate
        runValidators: true, // Menjalankan validasi schema
      }
    );

    if (!organization) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};
