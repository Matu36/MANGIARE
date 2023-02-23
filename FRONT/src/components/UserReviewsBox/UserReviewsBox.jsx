import s from "./UserReviewsBox.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getReviews } from "../../Redux/actions/reviews";
import ReviewsCard from "../ReviewsCard/ReviewsCard.jsx";

const UserReviewsBox = () => {
  let { id } = useParams();
  let user = JSON.parse(localStorage.getItem("MANGIARE_user"));
  let dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  useEffect(() => {
    dispatch(getReviews());
  }, []);

  let userReview = user && reviews.filter((r) => r.userId === user.id);

  return (
    <div className={s.container}>
      <div className={s.titleDiv}>
        <h2>Your reviews</h2>
      </div>
      <div className={s.cardContainer}>
        {userReview.length > 0 ? (
          userReview.map(
            ({ comment, image, rate, userId, createdAt, recipeId }, i) => {
              return (
                <Link to={`/recipes/${recipeId}`}>
                  <ReviewsCard
                    key={i}
                    comment={comment}
                    image={image}
                    rate={rate}
                    userId={userId}
                    createdAt={createdAt}
                    recipeId={recipeId}
                  />
                </Link>
              );
            }
          )
        ) : (
          <div className={s.noRecipesDiv}>
            <p>No reviews yet. Write yours!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReviewsBox;
