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
import { putReview } from "../../../Redux/actions/reviews";

const ReviewsCard = ({
  comment,
  image,
  rate,
  recipeId,
  userId,
  createdAt,
  visible,
}) => {
  const [visibleState, setVisibleState] = useState(visible);
  const dispatch = useDispatch();
  const CreateAt = createdAt.split("T");

  const handleHideReview = (e, userId, recipeId) => {
    e.preventDefault();

    setVisibleState(!visible);

    dispatch(putReview(userId, recipeId));
  };
  const handleRestrictReview = () => {};

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

  return (
    <div className="cardContainer">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={image}
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">
              Rate: <span>{rateToStars(rate)} </span>
              creation date:{" "}
              <span>
                {CreateAt[0]} - {CreateAt[1].split(".")[0]}{" "}
              </span>
            </Heading>

            <Text py="2" className="divText">
              {comment}
            </Text>
          </CardBody>
        </Stack>
        <div className="containerButtons">
          {visibleState ? (
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              className="button"
              onClick={(e) => handleHideReview(e, userId, recipeId)}
            >
              Hide Review
            </Button>
          ) : (
            <Button
              colorScheme="teal"
              variant="outline"
              size="sm"
              className="button"
              onClick={(e) => handleHideReview(e, userId, recipeId)}
            >
              Show Review
            </Button>
          )}
          <Button
            colorScheme="red"
            variant="outline"
            size="sm"
            className="button"
            onClick={(e) => handleRestrictReview(e, userId)}
          >
            Restrict Reviews
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReviewsCard;
