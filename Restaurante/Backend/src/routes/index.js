const express = require('express');
const router = express.Router();
const rotasContato = require('./rotasContato')
const rotasPedido = require('./rotasPedido')
const rotasMenu = require('./rotasMenu')

router.use(rotasContato);
router.use(rotasPedido);
router.use(rotasMenu);

module.exports = router;