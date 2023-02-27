import React from "react";
import s from "./RecipeCard.module.scss";
import { Link } from "react-router-dom";

function RecipeCard({ id, image, title, diets }) {
  let png = "https://cdn-icons-png.flaticon.com/512/7780/7780562.png";
  return (
    <Link to={`/recipes/${id}`}>
      <div className={s.card} id={id}>
        <img className={image ? s.img : s.noImage} src={image ? image : png} alt={title} />

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
    </Link>
  );
}

export default RecipeCard;
