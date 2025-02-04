const Hero = require("../models/heroModel");

const getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find({});
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHeroById = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createHero = async (req, res) => {
  try {
    const hero = await Hero.create(req.body);
    res.status(201).json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHero = async (req, res) => {
  try {
    const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hero) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};
