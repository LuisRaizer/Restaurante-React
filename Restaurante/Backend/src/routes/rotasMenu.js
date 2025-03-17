const express = require('express');
const { getMenu, adicionarItem, atualizarItem, deletarItem } = require('../controllers/MenuController');

const router = express.Router();

router.post('/menu', adicionarItem);
router.get('/menu', getMenu);
router.put('/menu/:id', atualizarItem);
router.delete('/menu/:id', deletarItem);

module.exports = router;