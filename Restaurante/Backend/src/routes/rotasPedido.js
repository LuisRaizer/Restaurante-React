const express = require('express');
const { GetPedidos, criarPedido, deletarPedidos } = require('../controllers/pedidoController');

const router = express.Router();

router.get('/pedidos', GetPedidos);
router.post('/pedidos', criarPedido);
router.delete('/pedidos/:id', deletarPedidos);

module.exports = router;