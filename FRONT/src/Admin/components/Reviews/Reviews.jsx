import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../Redux/actions/reviews.js";
import ReviewsCard from "../ReviewsCard/ReviewsCard.jsx";
import "./reviews.css";

export default function Reviews() {
  let dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  console.log(reviews);
  useEffect(() => {
    dispatch(getReviews());
  }, []);
  return (
    <div>
      {reviews &&
        reviews.map(({ comment, image, rate, recipeId, userId, createdAt }) => {
          <ReviewsCard
            comment={comment}
            image={image}
            rate={rate}
            recipeId={recipeId}
            userId={userId}
            createdAt={createdAt}
          />;
        })}
    </div>
  );
}
