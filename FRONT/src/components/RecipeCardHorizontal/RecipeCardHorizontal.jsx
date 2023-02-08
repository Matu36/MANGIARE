import React from "react";
import s from "./RecipeCardHorizontal.module.css";
import { NavLink } from "react-router-dom";

const RecipeCardHorizontal = ({ id, title, image, diets }) => {
  return (
    <div className={s.container}>
      <div className={s.imageDiv}>
        <img alt="recipe" src={image} />
      </div>

      <div className={s.infoDiv}>
        <div className={s.infoMainDiv}>
          <h3 className={s.title}>{title}</h3>
          <p className={s.description}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            fugiat recusandae incidunt natus pariatur obcaecati fuga quasi
            blanditiis, corrupti iste rerum sequi repellendus, possimus
            voluptatibus quidem molestiae iure facere ad.
          </p>
          <div className={s.dietsDiv}>
            {diets.map((d, i) => {
              d = d[0].toUpperCase() + d.slice(1);
              return <p key={i}>{d}</p>;
            })}
          </div>
        </div>
        <div className={s.infoAuxDIv}>
          <p>⏱ 30'</p>
          <p>👨‍👩‍👦 3 personas</p>
          <p>📖 Difícil</p>
          <NavLink to={`/recipes/${id}`}>
          <button className={s.button}>MORE DETAILS</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardHorizontal;
