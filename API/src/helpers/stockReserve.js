const {
    Ingredients,
    Orders,
    Order_details} = require("../db");

// Recibe una orderId (con status 1). Revisa en el detail si puede reservar todos los ingredientes. En caso de que pueda, reserva y actualiza la order a status 2.
// Devuelve true si actualiza algo. False si no actualizó ninguna orden.

module.exports = async (orderId) => {
    let orderInstance = await Orders.findOne({where: {id: orderId}, include: {model: Order_details, include: {model: Ingredients}}});

    if (!orderInstance.Order_details.some(({amount, Ingredient}) => amount > Ingredient.stock)) {
      await Ingredients.bulkCreate(
        orderInstance.Order_details.map(({amount, Ingredient}) => ({name: Ingredient.name, price: Ingredient.price, id:Ingredient.id, stock: (Ingredient.stock - amount)})),
        {updateOnDuplicate: ['stock']}
      );

      await orderInstance.update({status: 2});

      return true;
    }    

    return false;
};
  