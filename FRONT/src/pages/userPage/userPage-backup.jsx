import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import s from "./UserPage.module.css";
import {
  Box,
  Image,
  Text,
  IconButton,
  Button,
  HStack,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import Filters from "../../components/Filters/Filters";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { getFavorites } from "../../Redux/actions/favorites";
import banner from "../../img/BannerHome.jpg";
import { Avatar } from "@chakra-ui/react";
import RecipesBox from "../../components/RecipesBox/RecipesBox";
import UserReviewsBox from "../../components/UserReviewsBox/UserReviewsBox";
import { getRecipes } from "../../Redux/actions/recipes";
import UserOrdersBox from "../../components/UserOrdersBox/UserOrdersBox";

export default function UserPage() {
  let dispatch = useDispatch();
  let { user } = useAuth0();
  const name = user ? user.name : null;
  const LS_user = JSON.parse(localStorage.getItem("MANGIARE_user"));

  const favorites = useSelector((state) => state.favorites.favorites);
  const recipes = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getFavorites());
  }, []);

  let filteredFavorites = favorites.filter((f) => f.userId === LS_user.id);
  let userFavorites = [];
  recipes.forEach((r) => {
    if (filteredFavorites.some((f) => r.id === f.recipeId))
      userFavorites.push(r);
  });

  let filteredRecipes = recipes.filter((r) => r.userId === LS_user.id);

  return (
    <div className={s.containerMain}>
      <NavBar />
      <Box
        width="100%"
        marginTop="1px"
        backgroundImage={banner}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          borderBottom: "5px solid black",
        }}
      >
        <Box flex="1">
          {/* <Avatar size='' name={user.name} src='https://bit.ly/sage-adebayo' className={s.profileImg}/> */}
          <Avatar
            size="2xl"
            bg="teal.500"
            className={s.profileImg}
            // src={user.picture}
          />
        </Box>

        <Box
          width="70%"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Text className={s.userName}>{name}</Text>
        </Box>
      </Box>
      <div className={s.boxesContainer}>
        <RecipesBox title="Favorites" recipes={userFavorites} />
        <RecipesBox title="Created recipes" recipes={filteredRecipes} />
        <UserReviewsBox />
        <UserOrdersBox />
      </div>

      {/* <div>
        <Box
          width="100%"
          height="100%"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Text fontSize="5xl" fontWeight="bold" color="yellow.900">
            Your recipes!{" "}
          </Text>
        </Box>
        <Center>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            <Card>
              <CardHeader>
                <Heading size="md"> Probando las modificacioens</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md"> Customer dashboard</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md"> Customer dashboard</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </Center>
      </div> */}
    </div>
  );
}
