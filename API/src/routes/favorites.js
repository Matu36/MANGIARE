const router = require("express").Router();
const getFavorites = require("../controllers/getFavorites");
const postFavorite = require("../controllers/postFavorite");
const deleteFavorite = require("../controllers/deleteFavorite");

router.get("/:userId", getFavorites);
router.get("/", getFavorites);
router.post("/", postFavorite);
router.delete("/", deleteFavorite);

module.exports = router;
