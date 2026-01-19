const Mood = require('../models/Mood.model');
const Persona = require('../models/Persona.model');
const ScentNote = require('../models/ScentNote.model');

exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find().sort('name');
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch moods' });
  }
};

exports.getPersonas = async (req, res) => {
  try {
    const personas = await Persona.find().sort('name');
    res.json(personas);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch personas' });
  }
};

exports.getPersonaByName = async (req, res) => {
  try {
    const { name } = req.params;

    const persona = await Persona.findOne({ name });
    if (!persona) {
      return res.status(404).json({ message: 'Persona not found' });
    }

    res.json(persona);
  } catch (err) {
    console.error('Get persona error:', err);
    res.status(500).json({ message: 'Failed to fetch persona' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await ScentNote.find().sort('category');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};
