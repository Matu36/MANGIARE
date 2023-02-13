const router = require('express').Router();
const postCheckout = require('../controllers/postCheckout');

router.post('/', postCheckout);

module.exports = router;