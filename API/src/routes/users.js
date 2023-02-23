const router = require("express").Router();
const postUser = require("../controllers/postUser");
const getUsers = require("../controllers/getUsers");
const putUser = require("../controllers/putUser");

router.get("/", getUsers);
router.post("/", postUser);
router.put("/", putUser);

module.exports = router;
