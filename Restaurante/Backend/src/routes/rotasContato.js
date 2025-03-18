const express = require('express');
const { EnviarMensagem, GetMensagens } = require('../controllers/ContatoController.js');

const router = express.Router();

router.post('/contato', EnviarMensagem);

router.get('/contato', GetMensagens);

module.exports = router;
