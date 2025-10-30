const express = require('express');
const router = express.Router();
const responseActionController = require('../controllers/responseActionController');

// Response Action routes
router.get('/', responseActionController.getAllResponseActions);
router.get('/:id', responseActionController.getResponseActionById);
router.post('/', responseActionController.createResponseAction);
router.put('/:id', responseActionController.updateResponseAction);
router.delete('/:id', responseActionController.deleteResponseAction);

module.exports = router;