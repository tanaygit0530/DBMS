const express = require('express');
const router = express.Router();
const responseTeamController = require('../controllers/responseTeamController');

// Response Team routes
router.get('/', responseTeamController.getAllResponseTeams);
router.get('/:id', responseTeamController.getResponseTeamById);
router.post('/', responseTeamController.createResponseTeam);
router.put('/:id', responseTeamController.updateResponseTeam);
router.delete('/:id', responseTeamController.deleteResponseTeam);

module.exports = router;