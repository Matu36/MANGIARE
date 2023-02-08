const {Favorites, Users} = require('../db.js');

module.exports = async (req, res) => {
  try{
    if ((!req.body?.userId) || ((!req.body?.recipeId))) throw 'No body params'

    await Favorites.create(req.body);

    let newUserFavorites = await Users.findByPk(req.body.userId, {include: {all: true}});

    if (!newUserFavorites) throw 'Error ocurred getting users favorites'

    res.send(newUserFavorites);
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};