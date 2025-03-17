const express = require('express');
const { EnviarMensagem, GetMensagens } = require('./controllers/pedidoController.js');

const router = express.Router();

router.post('/contact', EnviarMensagem);

router.get('/contacts', GetMensagens);

module.exports = router;
