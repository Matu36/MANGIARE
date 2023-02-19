import React from "react";
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
import { useSelector } from "react-redux";

const ReviewsCard = ({ comment, image, rate, recipeId, userId, createdAt }) => {
  const reviews = useSelector((state) => state.reviews.reviews);

  const handleHideReview = (e, userId, recipeId) => {
    e.preventDefault();
    let newReviews = [...reviews];
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
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">
              Rate Points: {rate} creation date: {createdAt.split("T")[0]}
            </Heading>

            <Text py="2" className="divText">
              {comment}
            </Text>
          </CardBody>
        </Stack>
        <div className="containerButtons">
          <Button
            colorScheme="teal"
            variant="outline"
            size="sm"
            className="button"
            onClick={(e) => handleHideReview(e, userId, recipeId)}
          >
            Hide Review
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            size="sm"
            className="button"
            onClick={(e) => handleHideReview(e, userId)}
          >
            Restrict Reviews
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReviewsCard;
