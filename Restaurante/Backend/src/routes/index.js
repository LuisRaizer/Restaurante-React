const express = require('express');
const router = express.Router();
rotasContato = require('./rotasContato')

router.use(rotasContato);

module.exports = router;