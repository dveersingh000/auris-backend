const express = require('express');
const router = express.Router();

const {
  getAllPerfumes,
  getPerfumeById,
} = require('../controllers/perfume.controller');

router.get('/perfumes', getAllPerfumes);
router.get('/perfumes/:id', getPerfumeById);

module.exports = router;
