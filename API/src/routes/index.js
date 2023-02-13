const { Router } = require('express');
const router = Router();
const recipesRouter = require ('./recipes');
const ingredientsRouter = require ('./ingredients');
const favoritesRouter = require ('./favorites');
const reviewsRouter = require ('./reviews');
const usersRouter = require ('./users');
const checkoutRouter = require ('./checkout');
const paymentRouter = require ('./payment');

router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/favorites", favoritesRouter);
router.use("/reviews", reviewsRouter);
router.use("/users", usersRouter);
router.use("/checkout", checkoutRouter);
router.use("/payment", paymentRouter);

module.exports = router;