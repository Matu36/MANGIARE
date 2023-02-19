const router = require('express').Router();
const postUser = require('../controllers/postUser');
const getUsers = require('../controllers/getUsers');

router.get('/', getUsers);
router.post('/', postUser);

module.exports = router;