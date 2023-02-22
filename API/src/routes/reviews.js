const router = require("express").Router();
const getReviews = require("../controllers/getReviews");
const postReview = require("../controllers/postReview");
const putReview = require("../controllers/putReview");

router.get("/", getReviews);
router.post("/", postReview);
router.put("/", putReview);

module.exports = router;
