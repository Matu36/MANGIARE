const router = require('express').Router();
const getOrders = require('../controllers/getOrders');
const postOrder = require('../controllers/postOrder');

router.get('/', getOrders);
router.post('/', postOrder);

module.exports = router;