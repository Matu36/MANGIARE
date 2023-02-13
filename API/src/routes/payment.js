const router = require('express').Router();
const postPayment = require('../controllers/postPayment');

router.post('/', postPayment);

module.exports = router;