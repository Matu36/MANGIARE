import React from "react";
import s from "./RecipesBox.module.scss";
import { Link } from "react-router-dom";

const RecipesBox = ({ title, recipes }) => {
  return (
    <div className={s.container}>
      <div className={s.titleDiv}>
        <h2>{title}</h2>
      </div>
      <div className={s.recipesDiv}>
        {recipes.length > 0 ? (
          recipes.map((r) => {
            return (
              <Link to={`/recipes/${r.id}`}>
                <div className={s.recipeItem}>
                  <div className={s.imageDivContainer}>
                    <div className={s.imageDiv}>
                      <img src={r.image} alt={r.title} className={s.image} />
                    </div>
                  </div>
                  <div className={s.recipeTitleDiv}>{r.title}</div>
                </div>
              </Link>
            );
          })
        ) : (
          <p>Your {title.toLowerCase()} will be displayed here</p>
        )}
      </div>
    </div>
  );
};

export default RecipesBox;
