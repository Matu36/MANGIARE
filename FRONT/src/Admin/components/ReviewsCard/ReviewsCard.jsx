import { Img } from "@chakra-ui/image";
import React from "react";

const ReviewsCard = (props) => {
  const { comment, image, rate, recipeId, userId, createdAt } = props;
  return (
    <div>
      <img src={image} alt={userId} />
      <span>{comment}</span>
      <span>{rate}</span>
      <span>{recipeId}</span>
      <span>{createdAt}</span>
    </div>
  );
};

export default ReviewsCard;
