const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    characteristics: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Persona', PersonaSchema);
