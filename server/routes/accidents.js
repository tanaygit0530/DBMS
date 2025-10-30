const express = require('express');
const router = express.Router();
const accidentController = require('../controllers/accidentController');

// Accident routes
router.get('/', accidentController.getAllAccidents);
router.get('/:id', accidentController.getAccidentById);
router.post('/', accidentController.createAccident);
router.put('/:id', accidentController.updateAccident);
router.delete('/:id', accidentController.deleteAccident);

module.exports = router;