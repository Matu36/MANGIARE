const {Reviews} = require('../db.js');

module.exports = async (req, res) => {
  try{

    let reviews = ((req.params?.userId) || (req.params?.recipeId))
        ? await Reviews.findAll({where: req.params})
        : await Reviews.findAll()

    return (!reviews)
      ? res.status(404).send('Reviews Not Found')
      : res.send(reviews);
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};