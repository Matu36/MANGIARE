const {Ingredients} = require('../db.js');

module.exports = async (req, res) => {
  try{
    let ing = await Ingredients.findAll({include: 'Ingredient_units', required: false});
    
    return (!ing)
      ? res.status(404).send('Ingredients Not Found')
      : res.send(ing.map(({id, name, price, Ingredient_units}) => ({id, name, price, units: Ingredient_units.map(({unit}) => unit)})));

  }
  catch(error) {
    console.log(error);
    return res.status(404).send('Error 404');
  }
}