const router = require('express').Router();
const getOrders = require('../controllers/getOrders');
const postOrder = require('../controllers/postOrder');
const putOrder = require('../controllers/putOrder');

router.get('/', getOrders);
router.post('/', postOrder);
router.put('/', putOrder);

module.exports = router;