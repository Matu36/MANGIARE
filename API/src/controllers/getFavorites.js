const {Favorites} = require('../db.js');

module.exports = async (req, res) => {
  try{
    let favorites = (req.params.userId)
      ? await Favorites.findAll({where: req.params})
      : await Favorites.findAll()

    return (!favorites)
      ? res.status(404).send('Favorites Not Found')
      : res.send(favorites);
  }
  catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
};