const mongoose = require('mongoose');

const ScentNoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['top', 'middle', 'base'],
      required: true,
    },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ScentNote', ScentNoteSchema);
