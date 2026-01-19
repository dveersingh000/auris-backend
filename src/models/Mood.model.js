const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    color: { type: String },
    icon: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Mood', MoodSchema);
