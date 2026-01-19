const express = require('express');
const router = express.Router();

const {
  getMoods,
  getPersonas,
  getNotes,
  getPersonaByName,
} = require('../controllers/meta.controller');

router.get('/moods', getMoods);
router.get('/personas', getPersonas);
router.get('/personas/by-name/:name', getPersonaByName);
router.get('/notes', getNotes);

module.exports = router;
