const mongoose = require('mongoose');

const PerfumeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String },
    image_url: { type: String },
    price: { type: Number },
    aura_color: { type: String },
    vr_environment: { type: String },
    emotional_impact: { type: String },

    moods: [
      {
        moodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Mood',
          required: true,
        },
        strength: { type: Number, min: 1, max: 10 },
      },
    ],

    personas: [
      {
        personaId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Persona',
          required: true,
        },
        match_score: { type: Number, min: 1, max: 10 },
      },
    ],

    notes: [
      {
        noteId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ScentNote',
          required: true,
        },
        prominence: { type: Number, min: 1, max: 10 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Perfume', PerfumeSchema);
