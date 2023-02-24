import React from "react";
import s from "./RecipesBox.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteReview, getFavorites } from "../../Redux/actions/favorites";
import { FaHeart } from "react-icons/fa";

const RecipesBox = ({ title, recipes }) => {
  let dispatch = useDispatch();

  const LS_user = JSON.parse(localStorage.getItem("MANGIARE_user"));

  const deleteFavorite = async (id) => {
    await dispatch(deleteReview(LS_user.id, id));
    dispatch(getFavorites());
  };

  return (
    <div className={s.container}>
      <div className={s.titleDiv}>
        <h2>{title}</h2>
      </div>
      <div className={s.recipesDiv}>
        {recipes.length > 0 ? (
          recipes.map((r) => {
            return (
              <div className={s.itemContainer}>
                <Link to={`/recipes/${r.id}`} className={s.recipeItem}>
                  <div className={s.imageDivContainer}>
                    <div className={s.imageDiv}>
                      <img src={r.image} alt={r.title} className={s.image} />
                    </div>
                  </div>
                  <div className={s.recipeTitleDiv}>{r.title}</div>
                </Link>
                <div
                  className={s.heartButtonDiv}
                  onClick={() => deleteFavorite(r.id)}
                >
                  <FaHeart />
                </div>
              </div>
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
