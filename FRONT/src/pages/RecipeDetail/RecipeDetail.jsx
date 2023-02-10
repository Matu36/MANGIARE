import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getRecipeDetail } from "../../Redux/actions";
import s from "../RecipeDetail/RecipeDetail.module.css";
import NavBar from "../../components/NavBar/NavBar";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart/ShoppingCart";
import { Box, Image, Text, IconButton, Button, Container, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import background from "../../img/BackgroundDetail.jpg";

const RecipeDetail = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let recipe = useSelector((state) => state.recipeDetail);
  if (recipe.msg) alert(recipe.msg);

  const { title, image, instructions, raiting, ingredients, diets } = recipe;

  const handleClick = () => {};

  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, [id]);

  return (
    <Box width="100%" height="1200px" marginTop= '1px' backgroundImage={background} 
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundSize: 'cover', filter:'contrast(100%)',
      backgroundPosition: 'center center', backgroundAttachment: 'fixed'}}> 
      <Box width = '100%' height = '4%' marginBottom = 'none'>
        <NavBar />     
      </Box>

      <Box width ='100%' height='1000px' marginTop='1px' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', filter:'contrast(90%)'}}>
        <Text fontSize='60px' >{title}</Text>
      
        <Box width = '40%' height ='40%' objectFit={'cover'} borderRadius= '10px'>
          <img src={image} alt={title} />
        </Box>
      
    <Tabs  align='center' variant='enclosed'>
      <TabList>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Ingredients</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Recipe</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Diets</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Rating</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Shopping Cart</Tab>
      </TabList>
      <TabPanels>
        <TabPanel backgroundColor='rgba(255, 255, 255, 0.7)'>
        <ul className="recipeDetail">
        {ingredients &&
          ingredients.map(({ name, amount, unit, price }) => {
            return <li>{`${name} : ${amount} ${unit} $${price}`}</li>;
          })}
      </ul>
        </TabPanel>
            <TabPanel backgroundColor='rgba(255, 255, 255, 0.5)'>
        <Box width = '50%' color='black'>
          <p>{instructions}</p>
          </Box>
        </TabPanel>
        <TabPanel backgroundColor='rgba(255, 255, 255, 0.5)'>
        <ul className="recipeDetail">
        {diets &&
          diets.map((diet) => {
            return <li>{diet}</li>;
          })}
      </ul>
        </TabPanel>
        <TabPanel backgroundColor='rgba(255, 255, 255, 0.5)'l>
        <Box width = '25%' height='40%' display='flex' alignContent="left" marginTop='1px' fontSize='20px'>Rating: {raiting}</Box>
        </TabPanel>

        <TabPanel backgroundColor='rgba(255, 255, 255, 0.5)'>
        <ShoppingCart />
        </TabPanel>
      </TabPanels>




    </Tabs>
      </Box>
    </Box>
  );
};

export default RecipeDetail;
