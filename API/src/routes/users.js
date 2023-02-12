const router = require('express').Router();
const postUser = require('../controllers/postUser');

router.post('/', postUser);

module.exports = router;