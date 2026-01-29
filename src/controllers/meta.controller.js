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

    const persona = await Persona.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });
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

exports.analyzeMood = async (req, res) => {
  try {
    const { scores } = req.body;

    if (!scores || Object.keys(scores).length === 0) {
      return res.status(400).json({ message: 'No mood scores provided' });
    }
    const topMoodName = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );
    const detectedMood = await Mood.findOne({ 
      name: { $regex: new RegExp(`^${topMoodName}$`, 'i') } 
    });

    if (!detectedMood) {
      return res.status(404).json({ message: `Detected mood '${topMoodName}' not found in DB` });
    }
    let detectedPersona = await Persona.findOne({ 
      associated_moods: { $in: [topMoodName] } 
    });

    if (!detectedPersona) {
      console.warn(`No persona mapping found for mood: ${topMoodName}. Using fallback.`);
      detectedPersona = await Persona.findOne({ name: 'The Sophisticated' });
    }

    res.json({
      mood: detectedMood,
      persona: detectedPersona
    });

  } catch (err) {
    console.error('Mood analysis error:', err);
    res.status(500).json({ message: 'Failed to analyze mood' });
  }
};
