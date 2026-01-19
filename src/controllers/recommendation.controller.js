const Perfume = require('../models/Perfume.model');

exports.getRecommendations = async (req, res) => {
  try {
    const { moodId, personaId, noteIds } = req.body;

    if (!moodId || !personaId || !Array.isArray(noteIds) || !noteIds.length) {
      return res.status(400).json({ message: 'Invalid recommendation input' });
    }

    const perfumes = await Perfume.find({
      $or: [
        { moods: { $elemMatch: { moodId, strength: { $gte: 6 } } } },
        { personas: { $elemMatch: { personaId, match_score: { $gte: 7 } } } },
        {
          notes: {
            $elemMatch: {
              noteId: { $in: noteIds },
              prominence: { $gte: 6 },
            },
          },
        },
      ],
    });

    const ranked = perfumes
      .map((p) => {
        let score = 0;

        if (p.moods.some((m) => m.moodId.equals(moodId))) score++;
        if (p.personas.some((p) => p.personaId.equals(personaId))) score++;
        if (p.notes.some((n) => noteIds.includes(n.noteId.toString())))
          score++;

        return { perfume: p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((r) => r.perfume);

    res.json(ranked);
  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({ message: 'Failed to generate recommendations' });
  }
};
