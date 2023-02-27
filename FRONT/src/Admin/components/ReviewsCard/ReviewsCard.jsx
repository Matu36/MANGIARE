import React, { useEffect, useState } from "react";
import "./ReviewsCard.css";
import {
  Card,
  Button,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const ReviewsCard = ({
  comment,
  image,
  rate,
  createdAt,
  recipeId,
  userId,
  visible,
  handleHideReview,
}) => {
  const CreateAt = createdAt.split("T");

  const rateToStars = (rate) => {
    switch (rate) {
      case 1:
        return "⭐";
      case 2:
        return "⭐⭐";
      case 3:
        return "⭐⭐⭐";
      case 4:
        return "⭐⭐⭐⭐";
      case 5:
        return "⭐⭐⭐⭐⭐";
      default:
        break;
    }
  };

  const handleHideClick = (userId, recipeId) => {
    handleHideReview(userId, recipeId);
  };

  return (
    <div className="cardContainer">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "100px" }}
          src={image}
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody className="containerCardText">
            <Heading size="md">
              Rate: <span>{rateToStars(rate)} </span>
              creation date:{" "}
              <span>
                {CreateAt[0]} - {CreateAt[1].split(".")[0]}{" "}
              </span>
              <br></br>
              <span>Comments:</span>
            </Heading>
            <Text py="2" className="divText">
              {!visible && <strong>(Reviews Oculted)</strong>} {comment}
            </Text>
          </CardBody>
        </Stack>
        <div className="containerButtons">
          {visible ? (
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              className="button"
              onClick={() => handleHideClick(userId, recipeId)}
            >
              Hide Review
            </Button>
          ) : (
            <Button
              colorScheme="teal"
              variant="outline"
              size="sm"
              className="button"
              onClick={() => handleHideClick(userId, recipeId)}
            >
              Show Review
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ReviewsCard;
