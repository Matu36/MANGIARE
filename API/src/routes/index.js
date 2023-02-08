const { Router } = require('express');
const router = Router();
const recipesRouter = require ('./recipes');
const ingredientsRouter = require ('./ingredients');
const favoritesRouter = require ('./favorites');
const reviewsRouter = require ('./reviews');

router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/favorites", favoritesRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;