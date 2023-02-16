const router = require('express').Router();
const postEmail = require('../controllers/postEmail');

router.post('/', postEmail);

module.exports = router;
