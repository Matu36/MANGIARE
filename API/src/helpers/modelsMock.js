const { default: axios } = require("axios");
const {
  Users,
  Orders,
  Order_details,
  Shopping_carts,
  Favorites,
  Recipes,
  Recipe_ingredients,
  Recipe_diets,
  Ingredients,
  Ingredient_units,
  Reviews,
} = require("../db");
const { API_KEY } = process.env;

async function locMock() {
  ////////////////// Users //////////////////////

  await Users.bulkCreate([
    {email: 'email1@email.com'},
    {email: 'email2@email.com'},
    {email: 'email3@email.com'},
    {email: 'yamil.leotta@gmail.com', address: 'Av. Siempreviva 742'}, // role: null -> basic user
    {email: 'mangiare.email@gmail.com', role: false}, // role: false -> Admin
  ]);

  ////////////////// Orders //////////////////////

  await Orders.bulkCreate([
    { userId: 1 },
    { userId: 2, tsPayment: new Date(2023, 0, 1) },
    { userId: 2 },
  ]);

  ///////////////// Recipes /////////////////////////////

  await Recipes.create({
    id: 1,
    title: "Mila con pure",
    image:
      "https://www.simplefood.com.ar/wp-content/uploads/2021/03/Milanesa-de-pollo.jpg",
    instructions: "Instrucciones receta 1",
  });
  await Recipes.create({
    id: 2,
    title: "Hamburguesa completa con papas fritas",
    image:
      "https://img.freepik.com/fotos-premium/hamburguesas-papas-fritas-vaso-cola_237253-79.jpg?w=740",
    instructions: "Instrucciones receta 2",
  });
  await Recipes.create({
    id: 3,
    title: "Tarta de zapallitos",
    image: "https://assets.unileversolutions.com/recipes-v2/43250.jpg",
    instructions: "Instrucciones receta 3",
  });

  ///////////////// Ingredients /////////////////////////////

  await Ingredients.create({ id: 1, name: "carne", price: 1500 });
  await Ingredients.create({ id: 2, name: "pan rallado", price: 1000 });
  await Ingredients.create({ id: 3, name: "huevos", price: 20 });
  await Ingredients.create({ id: 4, name: "papa", price: 400 });
  await Ingredients.create({ id: 5, name: "leche", price: 50 });
  await Ingredients.create({ id: 6, name: "manteca", price: 30 });

  await Ingredients.create({ id: 7, name: "carne picada", price: 1500 });
  await Ingredients.create({ id: 8, name: "tomate", price: 50 });
  await Ingredients.create({ id: 9, name: "lechuga", price: 20 });

  await Ingredients.create({ id: 10, name: "zapallitos", price: 50 });
  await Ingredients.create({ id: 11, name: "queso cremoso", price: 1000 });
  await Ingredients.create({ id: 12, name: "harina", price: 200 });

  ///////////////// Recipe Ingredients /////////////////////////////

  await Recipe_ingredients.bulkCreate([
    { recipeId: 1, ingredientId: 1, amount: 1, unit: "pounds" },
    { recipeId: 1, ingredientId: 2, amount: 0.2, unit: "pounds" },
    { recipeId: 1, ingredientId: 3, amount: 3, unit: "units" },
    { recipeId: 1, ingredientId: 4, amount: 1, unit: "pounds" },
    { recipeId: 1, ingredientId: 5, amount: 1, unit: "cup" },
    { recipeId: 1, ingredientId: 6, amount: 1, unit: "tablespoon" },

    { recipeId: 2, ingredientId: 3, amount: 1, unit: "units" },
    { recipeId: 2, ingredientId: 7, amount: 0.3, unit: "pounds" },
    { recipeId: 2, ingredientId: 8, amount: 1, unit: "units" },
    { recipeId: 2, ingredientId: 9, amount: 1, unit: "units" },

    { recipeId: 3, ingredientId: 3, amount: 3, unit: "units" },
    { recipeId: 3, ingredientId: 10, amount: 5, unit: "units" },
    { recipeId: 3, ingredientId: 11, amount: 0.25, unit: "pounds" },
    { recipeId: 3, ingredientId: 12, amount: 0.3, unit: "pounds" },
  ]);

  ///////////////// Reviews /////////////////////////////

  await Reviews.bulkCreate([
    {
      recipeId: 3,
      userId: 1,
      rate: 3,
      comment: "Maso!",
      image:
        "https://aaahockey.org/wp-content/uploads/2017/06/default-avatar.png",
    },
    {
      recipeId: 2,
      userId: 1,
      rate: 4,
      comment: "Rica!",
      image:
        "https://aaahockey.org/wp-content/uploads/2017/06/default-avatar.png",
    },
    {
      recipeId: 1,
      userId: 1,
      rate: 5,
      comment: "Exquisita!",
      image:
        "https://aaahockey.org/wp-content/uploads/2017/06/default-avatar.png",
    },

    {
      recipeId: 2,
      userId: 2,
      rate: 5,
      comment: "Exquisita!",
      image:
        "https://aaahockey.org/wp-content/uploads/2017/06/default-avatar.png",
    },
    {
      recipeId: 1,
      userId: 2,
      rate: 5,
      comment: "Exquisita!",
      image:
        "https://aaahockey.org/wp-content/uploads/2017/06/default-avatar.png",
    },

    {
      recipeId: 1,
      userId: 3,
      rate: 1,
      comment: "Horrible!",
      image:
        "https://aaahockey.org/wp-content/uploads/2017/06/default-avatar.png",
    },
    {
      recipeId: 2,
      userId: 3,
      rate: 2,
      comment: "Fea!",
      image:
        "https://aaahockey.org/wp-content/uploads/2017/06/default-avatar.png",
    },
    {
      recipeId: 3,
      userId: 3,
      rate: 3,
      comment: "Maso!",
      image:
        "https://aaahockey.org/wp-content/uploads/2017/06/default-avatar.png",
    },
  ]);

  ///////////////// Ingredient Units /////////////////////////////

  await Ingredient_units.bulkCreate([
    { ingredientId: 1, unit: "pounds" },
    { ingredientId: 2, unit: "pounds" },
    { ingredientId: 3, unit: "units" },
    { ingredientId: 4, unit: "pounds" },
    { ingredientId: 5, unit: "cup" }, // leche
    { ingredientId: 5, unit: "tablespoon" }, // leche
    { ingredientId: 6, unit: "tablespoon" },
    { ingredientId: 7, unit: "pounds" },
    { ingredientId: 8, unit: "units" },
    { ingredientId: 9, unit: "units" },
    { ingredientId: 10, unit: "units" },
    { ingredientId: 11, unit: "pounds" },
    { ingredientId: 12, unit: "pounds" },
  ]);

  ////////////////// Order_details //////////////////////

  await Order_details.bulkCreate([
    {orderId: 1, ingredientId: 5, amount: 1, unit: 'tablespoon', price: 1.11},
    {orderId: 1, ingredientId: 12, amount: 2, unit: 'pounds', price: 2.22},
    {orderId: 3, ingredientId: 5, amount: 10, unit: 'cups', price: 3.33},
    {orderId: 3, ingredientId: 1, amount: 2, unit: 'pounds', price: 4.44},
    {orderId: 3, ingredientId: 2, amount: 3.5, unit: 'pounds', price: 5.55},
    {orderId: 2, ingredientId: 3, amount: 1, unit: 'units', price: 6.66},
    {orderId: 2, ingredientId: 4, amount: 2, unit: 'pounds', price: 7.77},
  ]);

  ////////////////// Shopping_carts //////////////////////

  await Shopping_carts.bulkCreate([
    { userId: 3, ingredientId: 7, amount: 2, unit: "pounds" },
    { userId: 3, ingredientId: 8, amount: 6, unit: "units" },
    { userId: 3, ingredientId: 9, amount: 3, unit: "units" },
    { userId: 2, ingredientId: 10, amount: 10, unit: "units" },
  ]);

  let order;

  ////////////////// New Order //////////////////////////

  await Order_details.create({orderId: (await Orders.create({userId: 3})).dataValues.id, ingredientId: 1, amount: 0.1, unit: 'pounds', price: 1.5});


  //console.log(order.dataValues); // {id: 4.......}

  ///////////////// New Order (Shopping_cart & User based) /////////////////////////////
/*
  let cart = await Shopping_carts.findAll({where: {userId: 3}});

  order = await Orders.create({userId: 1});
  await Order_details.bulkCreate(cart.map(({dataValues}) => ({...dataValues, id: null, orderId: order.dataValues.id})));
*/
  //console.log((await Users.findByPk(1, {include: 'Orders', required: false})).toJSON());

  ///////////////// Favorites (Recipe & User) /////////////////////////////

  await Favorites.create({ userId: 1, recipeId: 2 });
  await Favorites.create({ userId: 2, recipeId: 1 });
  await Favorites.create({ userId: 1, recipeId: 1 });

  /*
console.log('/////////////// Sin include //////////////////', (await Favorites.findAll({where: {userId: 1}})));
console.log('/////////////// Con include //////////////////', (await Users.findByPk(1, {include: 'Favorites'})).toJSON());
*/

  //////////////// Diets /////////////////

  await Recipe_diets.create({ recipeId: 3, diet: "vegan" });
  await Recipe_diets.create({ recipeId: 1, diet: "primal" });

  //console.log((await Recipes.findByPk(5, {include: 'Recipe_diets'})).toJSON());
}

async function apiMock(apiRegs = 10) {
  console.log("Obteniendo registros de API...");
  // https://api.spoonacular.com/recipes/complexSearch?apiKey=773ce458cdb14b6aa7558d74e5db3e57&addRecipeInformation=true&number=5
  // https://api.spoonacular.com/recipes/informationBulk?ids=782585,716426,715497&apiKey=773ce458cdb14b6aa7558d74e5db3e57
  // https://api.spoonacular.com/recipes/random?number=10&apiKey=773ce458cdb14b6aa7558d74e5db3e57

  let recipesArr = (
    await axios.get(
      `https://api.spoonacular.com/recipes/random?number=${apiRegs}&apiKey=${API_KEY}`
    )
  ).data.recipes.map(
    ({ id, title, image, diets, instructions, extendedIngredients }) => ({
      id,
      title,
      image,
      diets,
      instructions,
      ingredients: extendedIngredients.map(({ id, name, amount, unit }) => ({
        id,
        name,
        amount,
        unit,
      })),
    })
  );

  let log = recipesArr;

  //  log = // inserts en recipes
  (
    await Recipes.bulkCreate(
      recipesArr.map(({ id, title, image, instructions }) => ({
        id,
        title,
        image,
        instructions,
      }))
    )
  ).map(({ dataValues }) => dataValues);

  //  log = // inserts en recipe_diets
  (
    await Recipe_diets.bulkCreate(
      recipesArr.reduce(
        (aux, { id, diets }) =>
          aux.concat(...diets.map((diet) => ({ recipeId: id, diet }))),
        []
      )
    )
  ).map(({ dataValues }) => dataValues);

  ///// Acomodo la lista de recetas ////
  let auxIngredients = recipesArr
    .reduce(
      (aux, { ingredients }) =>
        aux.concat(
          ...ingredients.map(({ id, name, amount, unit }) => ({
            id,
            name,
            amount,
            unit,
            price: (Math.random() * 1000 + 1).toFixed(2),
          }))
        ),
      []
    )
    .reduce(
      (aux, el) =>
        aux.concat(el.id > 0 && !aux.find((el2) => el2.id === el.id) && el),
      []
    )
    .filter((el) => el); // saco id 0, negativos y duplicados

  //  log = auxIngredients;

  //  log = // inserts en ingredients
  (await Ingredients.bulkCreate(auxIngredients)).map(
    ({ dataValues }) => dataValues
  );

  //  log = // inserts en ingredient_units
  (
    await Ingredient_units.bulkCreate(
      auxIngredients
        .map(({ id, unit }) => ({ ingredientId: id, unit: unit || "units" }))
        .reduce(
          (aux, el) =>
            aux.concat(
              !aux.find(
                (el2) => el2.ingredientId === el.id && el2.unit === el.unit
              ) && el
            ),
          []
        )
        .filter((el) => el)
    )
  ).map(({ dataValues }) => dataValues);

  //  log = // inserts en recipe_ingredients
  (
    await Recipe_ingredients.bulkCreate(
      recipesArr
        .reduce(
          (aux, recipe) =>
            aux.concat(
              ...recipe.ingredients.map(({ id, amount, unit }) => ({
                recipeId: recipe.id,
                ingredientId: id,
                amount,
                unit: unit || "units",
              }))
            ),
          []
        )
        .reduce(
          (aux, el) =>
            aux.concat(
              el.ingredientId > 0 &&
                !aux.find(
                  (el2) =>
                    el2.ingredientId === el.ingredientId &&
                    el2.recipeId === el.recipeId
                ) &&
                el
            ),
          []
        )
        .filter((el) => el)
    )
  ).map(({ dataValues }) => dataValues);

  //  console.log (log, log.length);
}

module.exports = async (api) => {
  locMock();
  apiMock(api);
  console.log("Mock agregados a DB!");
};
