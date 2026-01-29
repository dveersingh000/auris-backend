const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    associated_moods: [{ type: String }],
    characteristics: [{ type: String }],
    image_url: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Persona', PersonaSchema);
