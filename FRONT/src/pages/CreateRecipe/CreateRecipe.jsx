

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
  useColorModeValue,
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
import background from "../../img/BKCreateRecipe6.png";
import NavBar from "../../components/NavBar/NavBar";
import uploadImageToCloudinary from "../../utils/Cloudinary/uploadImage";
import Swal from "sweetalert2";

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

    if (!this.props.ingredients?.length) this.props.getIngredients();

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
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Your recipe ${this.state.title} has been created`,
          text: 'Thank you for your contribution!',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => window.location.href = "/home");
      })
      .catch(() => Swal.fire({
        position: "center",
        icon: "error",
        title: "Your recipe has not been created",
        showConfirmButton: true,
      }))
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
     <Box
      width="100%"
      marginTop="1px"
      backgroundImage={["none", "none", 'none', background]}
      backgroundSize="cover"
      backgroundPosition={"center right 10%"}
    >
      
        <Box>
          <NavBar />

          <Flex 
          flexDirection="column" marginTop="70px">
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
              <Text
                fontSize={{ base: "20px", md: "30px", lg: "46px" }}
                textAlign="center"
                fontWeight="bold"
                color="yellow.600"
              >
                Write your cookbook online
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
              <Stack
                direction={["column", "column", "column", "row"]}
                justifyContent="space-between"
              >
              <Box >
                <table style={{ width: "80%", margin: "auto" }}>
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
                        <Input width= "100%"
                          
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
              <Box width="60%" >
              <Diets
                display="flex"
                onChange={this.handleDiets}
                diets={this.props.diets.filter((el) => el !== "All Diets")}
                actives={this.state.diets}
              />
              </Box>

              <Box>

              </Box>
              <Box>

              </Box>

</Stack>
          <Stack
                direction={["column", "column", "row", "row"]}
                justifyContent="space-evenly"
              >
                <VStack width={['90%', '90','30%','30%']}>
              <Box width="100%"  marginTop='100px'>
                
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
              <Box width={{ base: "90%", md: "90%", lg: "100%" }} >
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
                  <Text
                  width={{ base: "90%", md: "90%", lg: "100%" }}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "larger",
                      paddingBottom: "10px",
                      color: "red",
                    }}
                  >
                    Recipe must have at least one ingredient
                  </Text>
                )}
              </Box>

              <Box display="grid" gridGap={3} gridAutoFlow="row dense">
              <Text
                fontSize={{ base: "15px", md: "20px", lg: "30px" }}
                textAlign="left"
                fontWeight="bold"
                color="yellow.600"
                marginLeft="20px"
              >
                {" "}
                
              
                  Estimated cost of recipe:{" "}
                  {this.state.ingredients
                    .reduce((aux, el) => aux + el.price * el.amount, 0)
                    .toFixed(2)}
                </Text>
              </Box>
              </VStack>
              
              <VStack width={['100%', '100%', '60%']} alignContent={'center'}>
                <Box>
              <FormLabel fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
              <Text
                fontSize={{ base: "30px", md: "30px", lg: "36px" }}
                textAlign="left"
                fontWeight="bold"
                color="teal.600"
                // marginLeft="20px"
              >
                {" "}
                Instructions
              </Text>
               
              </FormLabel>
              </Box>
                
              <Box width={['100%', '100%', '50%']} p={5} rounded="md">
              
              <Input 
                id="instructions"
                name="instructions"
                value={this.state.instructions}
                placeholder="Recipe Instructions..."
                onChange={this.handleOnChange}
                backgroundColor="rgba(255, 255, 255, 0.9)"
                justifycontent="top"
                width={{ base: "90%", md: "90%", lg: "100%" }}
                height={{ base: "100px", md: "200px", lg: "300px" }}
                mx={{ base: 4, md: 8 }}
                mt={{ base: 4, md: 8 }}
                fontSize="larger"
                
              />
              </Box>
              <Box>
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
              </Box>
              </VStack>
              <VStack>

              </VStack>
              <VStack>

              </VStack>
              
            </Stack>
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
