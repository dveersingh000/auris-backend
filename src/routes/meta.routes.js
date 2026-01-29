const express = require('express');
const router = express.Router();

const {
  getMoods,
  getPersonas,
  getNotes,
  getPersonaByName,
  analyzeMood,
} = require('../controllers/meta.controller');

router.get('/moods', getMoods);
router.get('/personas', getPersonas);
router.get('/personas/by-name/:name', getPersonaByName);
router.get('/notes', getNotes);
router.post('/analyze-mood', analyzeMood);

module.exports = router;
