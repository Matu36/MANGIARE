import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getRecipeDetail } from "../../Redux/actions";
import s from "../RecipeDetail/RecipeDetail.module.css";
import NavBar from "../../components/NavBar/NavBar";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart/ShoppingCart";

const RecipeDetail = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let recipe = useSelector((state) => state.recipeDetail);
  if (recipe.msg) alert(recipe.msg);

  const { title, image, instructions, raiting, ingredients, diets } = recipe;

  const handleClick = () => {};

  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, [id]);

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
      <ul className="recipeDetail">
        {ingredients &&
          ingredients.map(({ name, amount, unit, price }) => {
            return <li>{`${name} : ${amount} ${unit} $${price}`}</li>;
          })}
      </ul>
      <div className= {s.sCart}>
      <ul className="recipeDetail">
        {diets &&
          diets.map((diet) => {
            return <li>{diet}</li>;
          })}
      </ul>
      <ShoppingCart />
      </div>
      <NavLink className={s.navlinkGoBackButton} to={"/home"}>
        <button>Go back</button>
      </NavLink>
    </div>
  );
};

export default RecipeDetail;
