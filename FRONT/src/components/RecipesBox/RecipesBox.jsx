import React from "react";
import s from "./RecipesBox.module.scss";

const RecipesBox = () => {
  let recipes = [
    {
      id: 1,
      title: "milanesa con pure",
      image:
        "https://www.quierovuelos.com.ar/wp-content/uploads/2019/12/Milanesa-con-pur%C3%A9-de-papas.png",
    },
    {
      id: 2,
      title: "papas fritas",
      image: "https://www.elsiglodetorreon.com.mx/m/i/2018/12/1125518.jpeg",
    },
    {
      id: 3,
      title: "pollo al horno",
      image:
        "https://www.deliciosi.com/images/1500/1583/pollo-al-horno-con-naranja.jpg",
    },
  ];

  return (
    <div className={s.container}>
      <div className={s.titleDiv}>
        <h2>Favoritos</h2>
      </div>
      <div className={s.recipesDiv}>
        {recipes.map((r) => {
          return (
            <div className={s.recipeItem}>
              <div className={s.imageDivContainer}>
                <div className={s.imageDiv}>
                  <img src={r.image} alt={r.title} className={s.image} />
                </div>
              </div>
              <div className={s.recipeTitleDiv}>{r.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipesBox;
