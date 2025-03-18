const express = require('express');
const { GetPedidos, criarPedido} = require('../controllers/pedidoController');

const router = express.Router();

router.get('/pedidos', GetPedidos);
router.post('/pedidos', criarPedido);

module.exports = router;