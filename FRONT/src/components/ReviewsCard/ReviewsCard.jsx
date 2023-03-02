import React from "react";
import s from "./ReviewsCard.module.scss";
import { useDispatch } from "react-redux";
import { FaTimesCircle } from "react-icons/fa";
import { getReviews, deleteReview } from "../../Redux/actions/reviews";
import {
  Box,
  Image,
  Text,
  IconButton,
  Button,
  Card,
  Center,
  Container,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Textarea,
  SimpleGrid,
  Spinner,
  Tab,
  TabPanel,
  Spacer,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";

const ReviewsCard = (props) => {
  let dispatch = useDispatch();
  const png = "https://cdn-icons-png.flaticon.com/512/2253/2253461.png";
  const user = JSON.parse(localStorage.getItem("MANGIARE_user"));

  const { comment, image, rate, userId, createdAt, recipeId } = props;

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

  const trimDate = (date) => {
    let hour = date.split("T")[1];
    date = date.split("T")[0];
    date = date.split("-");
    date = `${date[2]}/${date[1]}/${date[0]}`;
    hour = hour.split(":");
    hour = `${hour[0]}:${hour[1]}`;
    return `${date} - ${hour}`;
  };

  const handleDeleteReview = async () => {
    let info = { userId, recipeId };
    await dispatch(deleteReview(info));
    dispatch(getReviews());
  };

  return (
    <Center>
      <Box className={s.container}>
        {user && user.id === userId ? (
          <Button className={s.deleteButtonDiv} onClick={handleDeleteReview}>
            <FaTimesCircle />
          </Button>
        ) : null}
        <Image
          borderRadius="5px"
          w="30%"
          src={image ? image : png}
          alt={userId}
        />
        <div className={s.infoDiv}>
          <span className={s.stars}>{rateToStars(rate)}</span>
          <span className={comment.length > 30 ? s.longComment : null}>
            {comment}
          </span>
          <div className={s.userDiv}>
            <span>{userId}</span>
            <Text>{trimDate(createdAt)}</Text>
          </div>
        </div>
      </Box>
    </Center>
  );
};

export default ReviewsCard;
