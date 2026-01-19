const Perfume = require('../models/Perfume.model');
const { normalize } = require('../utils/normalize');

exports.getAllPerfumes = async (req, res) => {
  try {
    const perfumes = await Perfume.find().sort('name');
    res.json(perfumes.map(normalize));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch perfumes' });
  }
};

exports.getPerfumeById = async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);
    if (!perfume) {
      return res.status(404).json({ message: 'Perfume not found' });
    }
    res.json(normalize(perfume));
  } catch (err) {
    res.status(500).json({ message: 'Invalid perfume ID' });
  }
};
