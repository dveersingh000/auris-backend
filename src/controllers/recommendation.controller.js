const Perfume = require('../models/Perfume.model');

exports.getRecommendations = async (req, res) => {
  try {
    const { moodId, personaId, noteIds } = req.body;

    if (!moodId || !personaId) {
      return res.status(400).json({ message: 'Mood ID and Persona ID are required' });
    }
    
    const safeNoteIds = Array.isArray(noteIds) ? noteIds : [];
    const candidates = await Perfume.find({
      $or: [
        { 'moods.moodId': moodId },
        { 'personas.personaId': personaId },
        { 'notes.noteId': { $in: safeNoteIds } },
      ],
    })
    .populate('moods.moodId')
    .populate('personas.personaId')
    .populate('notes.noteId');

    const scoredCandidates = candidates.map((p) => {
      let totalScore = 0;
      let matchReasons = [];

      const moodMatch = p.moods.find((m) => m.moodId._id.equals(moodId));
      if (moodMatch) {
        totalScore += (moodMatch.strength || 5) * 2; 
        matchReasons.push('Mood Match');
      }

      const personaMatch = p.personas.find((per) => per.personaId._id.equals(personaId));
      if (personaMatch) {
        totalScore += (personaMatch.match_score || 5) * 1.5;
        matchReasons.push('Persona Match');
      }

      const matchedNotes = p.notes.filter((n) => safeNoteIds.includes(n.noteId._id.toString()));
      if (matchedNotes.length > 0) {
        const notesScore = matchedNotes.reduce((acc, curr) => acc + (curr.prominence || 5), 0);
        totalScore += notesScore;
        matchReasons.push(`${matchedNotes.length} Note(s)`);
      }

      return {
        ...p.toObject(),
        relevance_score: totalScore,
        match_reasons: matchReasons
      };
    });

    const ranked = scoredCandidates
      .sort((a, b) => b.relevance_score - a.relevance_score)
      .slice(0, 6);

    if (ranked.length === 0) {
       const fallback = await Perfume.find().limit(4);
       return res.json(fallback);
    }

    res.json(ranked);

  } catch (err) {
    console.error('Recommendation Engine Error:', err);
    res.status(500).json({ message: 'Failed to generate recommendations' });
  }
};
