import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getRecipeDetail, getIngredients, addToCart } from "../../Redux/actions";
import s from "../RecipeDetail/RecipeDetail.module.css";
import NavBar from "../../components/NavBar/NavBar";
import IngredientsList from "../../components/IngredientsList/ingredientsList";

const RecipeDetail = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let recipe = useSelector((state) => state.recipeDetail);
  const ingredients = useSelector((state) => state.ingredients);
  const [list, setList] = useState(); // Traigo datos faltantes de ingredients
  //formato list: [{id, name, price}, {id, name, price}...]
  const cart = useSelector(({cart}) => cart);

  if (recipe.msg) alert(recipe.msg);

  const { title, image, instructions, raiting, diets } = recipe;

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    dispatch(getIngredients());
  }, [id]);

  useEffect(() => {
    if (recipe.ingredients && ingredients){
      setList(recipe.ingredients.map(el => ({...el, ...ingredients.find(aux => aux.id === el.id)})))
    }
  }, [recipe, ingredients, cart]);

  const handleOnAdd = id => dispatch(addToCart((id) ? [list.find(el => el.id == id)] : list));

  const handleOnChange = ({target}) => {setList(list.map(el => (el.id != target.id) ? el : {...el, amount: (target.value <= 0) ? 0 : target.value}))};

  const handleOnUnitChange = (id, value) => {setList(list.map(el => (el.id != id) ? el : {...el, unit: value}))};

  return (
    <div className={s.containerMain}>
      <div className={s.containerButtonHome}>
        <NavBar />
        <br />
      </div>

      <div className={s.containerImageInstrutions}>
        <h1 className={s.title}>{title}</h1>
        <div className={s.containerImage}>
          <img src={image} alt={title} />
        </div>
        <div className={s.containerinstructions}>
          <p>{instructions}</p>
        </div>
      </div>
      <h3 className="recipeDetail">raiting: {raiting}</h3>

      <div style={{width: '50%', margin: 'auto'}}>
        {
          !list
            ? <h3>Loading...</h3>
            : (<IngredientsList
                items = {list.map(el => ({...el, units: [el.unit]}))}
                onChange = {handleOnChange}
                onUnitChange = {handleOnUnitChange}
                itemButton = {{
                  caption: 'Add Item',
                  action: handleOnAdd
                }}
                cart = {cart}
              />)
        }
      </div>

      <div className= {s.sCart}>
      <ul className="recipeDetail">
        {diets &&
          diets.map((diet, index) => {
            return <li key={index}>{diet}</li>;
          })}
      </ul>
      </div>
      <NavLink className={s.navlinkGoBackButton} to={"/home"}>
        <button>Go back</button>
      </NavLink>
    </div>
  );
};

export default RecipeDetail;
