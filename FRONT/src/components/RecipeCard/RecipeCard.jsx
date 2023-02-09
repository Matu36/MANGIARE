import React from "react";
import s from "./RecipeCard.module.scss";
import { NavLink } from "react-router-dom";

function RecipeCard({ id, title, image, diets }) {
  return (
    <NavLink to={`/recipes/${id}`}>
      <div className={s.card} id={id}>
        <img className={s.img} src={image} alt={title} />

        <div className={s.titleDiv}>
          <h2>{title}</h2>
        </div>

        <div className={s.bottomDiv}>
          <div className={s.dietsDiv}>
            {diets.map((d, i) => {
              d = d[0].toUpperCase() + d.slice(1);
              return <p key={i}>{d}</p>;
            })}
          </div>

          <div className={s.buttonDiv}>
            <button>DETAILS</button>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default RecipeCard;
