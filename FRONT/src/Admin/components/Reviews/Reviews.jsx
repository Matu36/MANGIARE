import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../Redux/actions/reviews.js";
import ReviewsCard from "../ReviewsCard/ReviewsCard.jsx";
import Paginations from "../../../components/Paginations/Paginations.jsx";
import { Input } from "@chakra-ui/react";
import "./Reviews.css";

export default function Reviews() {
  let dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    dispatch(getReviews());
  }, []);

  const [search, setSearch] = useState("");
  const [filterReviews, setFilterReviews] = useState(reviews);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    filterByReviews(search);
  }, [filterReviews, search]);

  const filterByReviews = (value) => {
    let arrayCache = [...filterReviews];
    arrayCache = arrayCache.filter((review) =>
      review.comment.toLowerCase().includes(value.toLowerCase())
    );

    setFilterReviews(arrayCache);
  };

  //                 Paginacion del contenido             //-----------------------------

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalreviews, setTotalReviews] = useState(reviews); //Recetas Totales Seteada en Array Vacio

  const indexFirstPageRecipe = () => (currentPage - 1) * 8; // Indice del primer Elemento
  const indexLastPageRecipe = () => indexFirstPageRecipe() + 8; //Indice del segundo elemento

  const handlePageNumber = (number) => {
    //Manejo del numero de pagina
    setCurrentPage(number);
  };

  useEffect(() => {
    //Cambio de estado local de Total Recipes indicando los indices que tiene que renderizar en cada pagina
    filterReviews &&
      setTotalReviews(
        filterReviews.slice(indexFirstPageRecipe(), indexLastPageRecipe())
      );
    filterReviews && setNumberOfPage(Math.ceil(filterReviews.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [reviews, currentPage, filterReviews]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterReviews]);

  return (
    <div className="divContainerCards">
      <div className="divContainerHead">
        <Input
          onChange={handleOnChange}
          placeholder="Search Review for comment"
          width="30rem"
          background="white"
          margin="10px"
        />
        <h1 className="titleReviews">Reviews</h1>
      </div>
      {totalreviews &&
        totalreviews.map((review) => {
          return (
            <ReviewsCard
              key={`${review.userId}${review.recipeId}`}
              comment={review.comment}
              image={review.image}
              rate={review.rate}
              recipeId={review.recipeId}
              userId={review.userId}
              createdAt={review.createdAt}
            />
          );
        })}
      {filterReviews && (
        <Paginations
          currentPage={currentPage}
          numberOfPage={numberOfPage}
          handlePageNumber={handlePageNumber}
        />
      )}
    </div>
  );
}
