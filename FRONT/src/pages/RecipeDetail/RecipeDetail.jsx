import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getRecipeDetail, getIngredients, addToCart } from "../../Redux/actions";
import s from "../RecipeDetail/RecipeDetail.module.css";
import NavBar from "../../components/NavBar/NavBar";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import { Box, Image, Text, IconButton, Button, Container, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import background from "../../img/BackgroundDetail.jpg";


const RecipeDetail = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let recipe = useSelector((state) => state.recipeDetail);
  const ingredients = useSelector((state) => state.ingredients);
  const [list, setList] = useState(); // Traigo datos faltantes de ingredients
  //formato list: [{id, name, price}, {id, name, price}...]
  const cart = useSelector(({cart}) => cart);

 
  const { title, image, instructions, raiting, diets } = recipe;

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    dispatch(getIngredients());
  }, [id]);

  useEffect(() => {
    if (recipe.ingredients && ingredients){
      setList(recipe.ingredients.map(el => ({...el, ...ingredients.find(aux => aux.id === el.id)})))
    }
  }, [recipe, ingredients, cart]);

  const handleOnAdd = id => dispatch(addToCart((id) ? [list.find(el => el.id == id)] : list));

  const handleOnChange = ({target}) => {setList(list.map(el => (el.id != target.id) ? el : {...el, amount: (target.value <= 0) ? 0 : target.value}))};

  const handleOnUnitChange = (id, value) => {setList(list.map(el => (el.id != id) ? el : {...el, unit: value}))};

  return (
    <>
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

    
    
      <div style={{width: '50%', margin: 'auto'}}>
        {
          !list
            ? <h3>Loading...</h3>
            : (<IngredientsList
                items = {list.map(el => ({...el, units: [el.unit]}))}
                onChange = {handleOnChange}
                onUnitChange = {handleOnUnitChange}
                itemButton = {{
                  caption: 'Add Item',
                  action: handleOnAdd
                }}
                cart = {cart}
              />)
        }
      </div>

        </Box>
      
    <Tabs  align='center' variant='enclosed'>
      <TabList>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Ingredients</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Recipe</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Diets</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Rating</Tab>
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
          diets.map((diet, index) => {
            return <li key={index}>{diet}</li>;
          })}
      </ul>

        </TabPanel>
        <TabPanel backgroundColor='rgba(255, 255, 255, 0.5)'l>
        <Box width = '25%' height='40%' display='flex' alignContent="left" marginTop='1px' fontSize='20px'>Rating: {raiting}</Box>
        </TabPanel>

        
      </TabPanels>

    </Tabs>
      </Box>
    </Box>
    <NavLink className={s.navlinkGoBackButton} to={"/home"}>
        <button>Go back</button>
      </NavLink>
</>
  );
};

export default RecipeDetail;
