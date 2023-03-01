import React from "react";
import Diets from "../../components/Diets/Diets";
import { createRecipe } from "../../Redux/actions/recipes";
import { getIngredients } from "../../Redux/actions/ingredients";
import { connect } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import s from "./CreateRecipe.module.css";
import logo from "../../img/CreateRecipe.png";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import {
  Box,
  Image,
  Text,
  IconButton,
  Button,
  extendTheme,
  Flex,
  Stack,
  FormLabel,
  Textarea,
  Spacer,
  Input,
  VStack,
  HStack,
  Center,
  
} from "@chakra-ui/react";
import background from "../../img/BkGcreateRecipe1.png";
import NavBar from "../../components/NavBar/NavBar";
import uploadImageToCloudinary from "../../utils/Cloudinary/uploadImage";
//import {Redirect} from 'react-router-dom';

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      instructions: "",
      image: null,
      ingredients: [],
      diets: [],
      error: {
        title: true,
        instructions: true,
        image: false,
        ingredients: true,
      },
      completed: true,
    };
  }

  componentDidMount() {
    if (!this.props.ingredients) this.props.getIngredients();
  }

  handleOnSelect = (autocomplete) => {
    if (this.state.ingredients.map((el) => el.id).includes(autocomplete.id))
      return alert("The ingredient is already in the list!");
    let ingredients = [
      ...this.state.ingredients,
      { ...autocomplete, amount: 0, unit: autocomplete.units[0] },
    ];
    this.setState((old) => ({
      ...old,
      error: { ...old.error, ingredients: true },
      ingredients,
    }));
  };

  formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  handleSubmit = async (event) => {
    console.log('llama a submit')
    event.preventDefault();

    let imageUrl = null;
    if (this.state.image) {
      imageUrl = await uploadImageToCloudinary("recipes", this.state.image);
    }

    let userId = JSON.parse(localStorage.getItem("MANGIARE_user")).id;

    this.props
      .createRecipe({
        ...this.state,
        userId: userId ? userId : null,
        image: imageUrl ? imageUrl : null,
        ingredients: this.state.ingredients.map(({ id, amount, unit }) => ({
          id,
          amount,
          unit,
        })),
      })
      .then(() => {
        alert(`The Recipe '${this.state.title}' has been created!`);
        window.location.href = "/home";
      })
      .catch(() => alert(`Error ocurred.`))
      .then(() => this.setState({ completed: true }));
  };

  handleOnDelete = (id) => {
    let ingredients = this.state.ingredients.filter((el) => el.id != id);
    this.setState((old) => ({
      ...old,
      ingredients,
      error: {
        ...old.error,
        ingredients:
          !ingredients.length || ingredients.some((el) => !el.amount),
      },
    }));
  };

  handleOnUnitChange = (id, value) => {
    this.setState((old) => ({
      ...old,
      ingredients: this.state.ingredients.map((el) =>
        el.id == id ? { ...el, unit: value } : el
      ),
    }));
  };

  handleOnChange = ({ target }, unit) => {
    let error = { ...this.state.error };

    let imageFile;
    target.name === "image" ? (imageFile = target.files[0]) : null;

    switch (target.name) {
      case "title":
        error.title = target.value.length < 4 || target.value.length > 25;
        break;
      case "image":
        const max_size = 10372672;
        error.image =
          imageFile &&
          (imageFile.size > max_size ||
            (!imageFile.name.includes(".jpg") &&
              !imageFile.name.includes(".jpeg") &&
              !imageFile.name.includes(".png")));
        break;
      case "instructions":
        error.instructions = target.value.length < 4;
        break;
      default:
        break;
    }

    let change;

    if (target.name === "image") change = { [target.name]: imageFile };
    else if (target.name !== "ingredient")
      change = { [target.name]: target.value };
    else {
      change = {
        ingredients: this.state.ingredients.map((el) =>
          el.id != target.id || el.unit != unit
            ? el
            : { ...el, amount: target.value <= 0 ? 0 : target.value }
        ),
      };
      error.ingredients = change.ingredients.some((el) => !el.amount);
    }

    this.setState((old) => ({ ...old, ...change, error }));
  };

  handleDiets = (diets) => {
    this.setState((old) => ({ ...old, diets }));
  };

  render() {
    //    if (this.state.completed) return <Redirect to="/home" />
    if (!this.props.ingredients) return <h2>Loading ingredients...</h2>;

    return (
      <Box backgroundImage= {logo}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      opacity="0.8"
      height="165vh"
      width="100vw"
       
      >
        <Box>
          <NavBar />

          <Flex justifyContent="center" flexDirection="column" marginTop="70px">
            <Stack maxH={"110px"}>
              <Text
                fontSize={{ base: "24px", md: "40px", lg: "56px" }}
                textAlign="center"
                fontWeight="bold"
                color="teal.600"
              >
                {" "}
                Create your own Recipe!
              </Text>
              
            </Stack>
            <Box
              width="100%"
              maxWidth="100%"
              p={4}
              mt={38}
              ml="10px"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box >
                <table style={{ width: "100%", margin: "auto" }}>
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="title">
                        <Text
                fontSize={{ base: "15px", md: "20px", lg: "30px" }}
                textAlign="left"
                fontWeight="bold"
                color="teal.600"
                marginLeft="60px"
              >
                {" "}
                Title
              </Text>
                          
                        </label>
                        <Input width= "200px"
                          
                          type="text"
                          id="title"
                          name="title"
                          value={this.state.title}
                          placeholder="Recipe title... "
                          onChange={this.handleOnChange}
                          fontSize= "larger"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontSize: "larger",
                          paddingBottom: "20px",
                          color: this.state.error.title ? "red" : "green",
                        }}
                      >
                        Title must be between 4 and 25 characters string
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="image">
                        <Text
                fontSize={{ base: "15px", md: "20px", lg: "30px" }}
                textAlign="left"
                fontWeight="bold"
                color="teal.600"
                marginLeft="60px"
              >
                {" "}
                Image file
              </Text>
                          
                        </label>

                        <input
                          type="file"
                          id="image"
                          name="image"
                          onChange={this.handleOnChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={1}
                        style={{
                          fontSize: "larger",
                          paddingBottom: "20px",
                          color: this.state.error.image ? "red" : "green",
                        }}
                      >
                        Select an image file (.jpg, .jpeg, .png) up to 10 mb
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
              <Diets
                display="flex"
                onChange={this.handleDiets}
                diets={this.props.diets.filter((el) => el !== "All Diets")}
                actives={this.state.diets}
              />
              <Box width="40%" p={4}>
                
                  <ReactSearchAutocomplete
                    showClear
                    showNoResultsText="No ingredients finded..."
                    items={this.props.ingredients}
                    onSelect={this.handleOnSelect}
                    autoFocus
                    formatResult={this.formatResult}
                    placeholder="Ingredients search"
                    fontSize="larger"
                    placeholderFontSize="larger"
                  />
                
              </Box>
              <Box width={{ base: "xsm", md: "3xl", lg: "6xl" }} p={4}>
                {this.state.ingredients.length ? (
                  <Text fontSize="xl" fontWeight="bold">
                  <IngredientsList
                    items={this.state.ingredients}
                    onChange={this.handleOnChange}
                    onUnitChange={this.handleOnUnitChange}
                    itemButton={{
                      caption: "Remove",
                      action: this.handleOnDelete,
                      
                    }}
                  />
                  </Text>
                 
                ) : (
                  <p
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "larger",
                      paddingBottom: "10px",
                      color: "red",
                    }}
                  >
                    Recipe must have at least one ingredient
                  </p>
                )}
              </Box>

              <Box display="grid" gridGap={3} gridAutoFlow="row dense">
              <Text
                fontSize={{ base: "15px", md: "20px", lg: "30px" }}
                textAlign="left"
                fontWeight="bold"
                color="teal.600"
                marginLeft="60px"
              >
                {" "}
                
              
                  Estimated cost of recipe: <br />{" "}
                  {this.state.ingredients
                    .reduce((aux, el) => aux + el.price * el.amount, 0)
                    .toFixed(2)}
                </Text>
              </Box>
              <FormLabel fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
              <Text
                fontSize={{ base: "18px", md: "30px", lg: "46px" }}
                textAlign="center"
                fontWeight="bold"
                color="teal.600"
              >
                {" "}
                Instructions
              </Text>
               
              </FormLabel>
              <Box bgGradient="linear(to-r, #D1D1D1, #E8E8E8, #F0FFF4)" p={5} rounded="md">
              <Text color="green.400" fontWeight="bold">
              <Input 
                id="instructions"
                name="instructions"
                value={this.state.instructions}
                placeholder="Recipe Instructions..."
                onChange={this.handleOnChange}
                backgroundColor="rgba(255, 255, 255, 0.9)"
                justifycontent="center"
                width={{ base: "xsm", md: "2xl", lg: "6xl" }}
                mx={{ base: 4, md: 8 }}
                mt={{ base: 4, md: 8 }}
                fontSize="larger"
                
              />

              <Button
                isDisabled={Object.values(this.state.error).includes(true)}
                variantColor="teal"
                align="center"
                variant="filled"
                width={{ base: "xsm", md: "2xl", lg: "6xl" }}
                mx={{ base: 6, md: 10 }}
                mt={{ base: 6, md: 10 }}
                fontWeight="bold"
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                onClick={this.handleSubmit}
              >
                Create Recipe!
              </Button>

              </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    );
  }
}

export default connect(
  ({ ingredients, filters }) => ({
    ingredients: ingredients.ingredients,
    diets: filters.diets,
  }),
  {
    getIngredients,
    createRecipe,
  }
)(CreateRecipe);
