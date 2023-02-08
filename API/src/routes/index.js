const { Router } = require('express');
const router = Router();
const recipesRouter = require ('./recipes');
const ingredientsRouter = require ('./ingredients');

router.use("/recipes", recipesRouter);
router.use("/ingredients", ingredientsRouter);

module.exports = router;