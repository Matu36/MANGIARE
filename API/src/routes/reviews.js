const router = require("express").Router();
const getReviews = require("../controllers/getReviews");
const postReview = require("../controllers/postReview");
const deleteReview = require("../controllers/deleteReview");

router.get("/", getReviews);
router.post("/", postReview);
router.delete("/", deleteReview);

module.exports = router;
