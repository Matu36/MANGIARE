import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewsCard from "../ReviewsCard/ReviewsCard.jsx";
//import ReviewsCard from "../../../components/ReviewsCard/ReviewsCard.jsx";
import Paginations from "../../../components/Paginations/Paginations.jsx";
import { Card, Button, Input } from "@chakra-ui/react";
import "../Reviews/reviews.css";
import { getReviews, putReview } from "../../../Redux/actions/reviews";
import axios from "axios";

export default function Reviews() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("MANGIARE_user"));
  // reviewsGlobal = useSelector((state) => state.reviews.reviews);
  const [reviewsGlobal, setReviewsGlobal] = useState([]);

  useEffect(() => {
    let user = {
      id: currentUser.id,
      email: currentUser.email,
    };
    axios
      .get(`/reviews`, { params: user })
      .then((response) => response.data)
      .then((data) => setReviewsGlobal(data));
  }, []);

  const [search, setSearch] = useState("");
  const [filterReviews, setFilterReviews] = useState();

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    filterByReviews(search);
  }, [search, reviewsGlobal]);

  const filterByReviews = (value) => {
    let arrayCache = [...reviewsGlobal];
    if (value === "") setFilterReviews(reviewsGlobal);
    else {
      arrayCache = arrayCache.filter((review) =>
        review.comment.toLowerCase().includes(value.toLowerCase())
      );
      setFilterReviews(arrayCache);
    }
  };

  //                 Paginacion del contenido             //-----------------------------

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalReviews, setTotalReviews] = useState(filterReviews); //Recetas Totales Seteada en Array Vacio

  const indexFirstPageRecipe = () => (currentPage - 1) * 9; // Indice del primer Elemento
  const indexLastPageRecipe = () => indexFirstPageRecipe() + 9; //Indice del segundo elemento

  const handlePageNumber = (number) => {
    //Manejo del numero de pagina
    setCurrentPage(number);
  };

  useEffect(() => {
    //Cambio de estado local de Total Recipes indicando los indices que tiene que renderizar en cada pagina

    setTotalReviews(
      filterReviews?.slice(indexFirstPageRecipe(), indexLastPageRecipe())
    );
    setNumberOfPage(Math.ceil(filterReviews?.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [filterReviews, currentPage, reviewsGlobal]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterReviews]);

  const handleHideReview = (userId, recipeId) => {
    dispatch(putReview(userId, recipeId)).then(() => {
      let user = {
        id: currentUser.id,
        email: currentUser.email,
      };
      axios
        .get(`/reviews`, { params: user })
        .then((response) => response.data)
        .then((data) => setReviewsGlobal(data));
    });
  };
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
      {totalReviews?.map((review) => {
        return (
          <ReviewsCard
            key={`${review.userId}${review.recipeId}`}
            comment={review.comment}
            image={review.image}
            rate={review.rate}
            recipeId={review.recipeId}
            userId={review.userId}
            createdAt={review.createdAt}
            visible={review.visible}
            handleHideReview={handleHideReview}
          />
        );
      })}
      <Paginations
        currentPage={currentPage}
        numberOfPage={numberOfPage}
        handlePageNumber={handlePageNumber}
      />
    </div>
  );
}
