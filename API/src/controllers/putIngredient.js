const {Ingredients} = require('../db.js');

module.exports = async (req, res) => {
  try{
    let ingredient = await Ingredients.findOne({where: {id: req.body.id}});

    await ingredient.update({...req.body});

    return (!ingredient)
      ? res.status(404).send('No Ingredient Found')
      : res.send(ingredient);

  }
  catch(error) {
    console.log(error);
    return res.status(500).send(error);
  }
}