const mongoose = require('mongoose');
require('dotenv').config();

const Mood = require('../models/Mood.model');
const Persona = require('../models/Persona.model');
const ScentNote = require('../models/ScentNote.model');
const Perfume = require('../models/Perfume.model');

async function seedPerfumes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Seeding perfumes & relationships...');

    // Clear old perfumes
    await Perfume.deleteMany();

    // Fetch reference data
    const moods = await Mood.find();
    const personas = await Persona.find();
    const notes = await ScentNote.find();

    const moodMap = Object.fromEntries(moods.map(m => [m.name, m._id]));
    const personaMap = Object.fromEntries(personas.map(p => [p.name, p._id]));
    const noteMap = Object.fromEntries(notes.map(n => [n.name, n._id]));

    // Helper
    const P = (data) => new Perfume(data);

    const perfumes = [
      P({
        name: 'La Vie Est Belle',
        brand: 'Lancôme',
        description:
          'A manifesto of happiness and freedom. Embrace joy and choose your own path.',
        image_url:
          'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
        price: 95,
        aura_color: '#FFB6D9',
        vr_environment: 'sunlight_garden',
        emotional_impact:
          'Radiates confidence and feminine joy. Makes you feel beautiful.',
        moods: [
          { moodId: moodMap.Romantic, strength: 9 },
          { moodId: moodMap.Energetic, strength: 7 },
          { moodId: moodMap.Fresh, strength: 6 },
        ],
        personas: [
          { personaId: personaMap['The Romantic'], match_score: 10 },
          { personaId: personaMap['The Free Spirit'], match_score: 8 },
        ],
        notes: [
          { noteId: noteMap.Fruity, prominence: 9 },
          { noteId: noteMap.Floral, prominence: 10 },
          { noteId: noteMap.Gourmand, prominence: 8 },
          { noteId: noteMap.Musk, prominence: 7 },
        ],
      }),

      P({
        name: 'Black Opium',
        brand: 'Yves Saint Laurent',
        description:
          'Dark sensuality with coffee and vanilla. An addictive adrenaline rush.',
        image_url:
          'https://images.pexels.com/photos/3310691/pexels-photo-3310691.jpeg',
        price: 90,
        aura_color: '#1A1A2E',
        vr_environment: 'night_city',
        emotional_impact:
          'Awakens boldness and mystery. Feel the power of the night.',
        moods: [
          { moodId: moodMap.Bold, strength: 10 },
          { moodId: moodMap.Mysterious, strength: 9 },
          { moodId: moodMap.Energetic, strength: 8 },
        ],
        personas: [
          { personaId: personaMap['The Bold Visionary'], match_score: 10 },
          { personaId: personaMap['The Adventurer'], match_score: 9 },
        ],
        notes: [
          { noteId: noteMap.Spicy, prominence: 8 },
          { noteId: noteMap.Gourmand, prominence: 10 },
          { noteId: noteMap.Oriental, prominence: 9 },
          { noteId: noteMap.Amber, prominence: 7 },
        ],
      }),
    ];

    await Perfume.insertMany(perfumes);
    console.log('Perfumes seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Perfume seeding failed', err);
    process.exit(1);
  }
}

seedPerfumes();
