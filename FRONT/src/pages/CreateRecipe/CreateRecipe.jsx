import React from "react";
import Diets from "../../components/Diets/Diets";
import { createRecipe } from "../../Redux/actions/recipes";
import { getIngredients } from "../../Redux/actions/ingredients";
import { connect } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import s from "./CreateRecipe.module.css";
import logo from "../../img/creandoReceta.jpg";
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
      <Box
        width="100%"
        marginTop="1px"
        backgroundImage={background}
        brightness={{ sm: "200%", md: "150%", lg: "100%" }}
        backgroundSize="cover"
        backgroundPosition={"right"}
      >
        <NavBar />

        <Flex flexDirection="column" marginTop="70px">
          <Stack flex="1">
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
              backgroundColor="white"
              opacity="0.5"
            >
              Write your cookbook online
            </Text>
          </Stack>
          <Box
            w="60%"
            mt={38}
            ml="20px"
            style={{
              display: "flex",
              justifyContent: "",
              flexDirection: "column",
            }}
          >
            <Stack>
              <Box as="form" onSubmit={this.handleSubmit} width="1100px">
                <Box display="flex" flexDirection="row" width="100%">
                  <Box
                    width={[
                      "100%", // 0-30em
                      "50%", // 30em-48em
                      "25%", // 48em-62em
                      "15%", // 62em+
                    ]}
                  >
                    <div className={s.body}>
                      <table style={{ width: "100%", margin: "auto" }}>
                        <tbody>
                          <tr>
                            <td width="50%">
                              <label htmlFor="title" className={s.label}>
                                Title:
                              </label>
                            </td>
                            <td>
                              <input
                                className={s.input}
                                type="text"
                                id="title"
                                name="title"
                                value={this.state.title}
                                placeholder="Recipe title..."
                                onChange={this.handleOnChange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td
                              colSpan={2}
                              style={{
                                fontSize: "smaller",
                                paddingBottom: "20px",
                                color: this.state.error.title ? "red" : "green",
                              }}
                            >
                              Title must be between 4 and 25 characters string
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label htmlFor="image" className={s.label}>
                                Image file:
                              </label>
                            </td>
                            <td>
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
                              colSpan={2}
                              style={{
                                fontSize: "smaller",
                                paddingBottom: "20px",
                                color: this.state.error.image ? "red" : "green",
                              }}
                            >
                              Select a image file (.jpg, .jpeg, .png) up to 10
                              mb
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <Diets
                      onChange={this.handleDiets}
                      diets={this.props.diets.filter(
                        (el) => el !== "All Diets"
                      )}
                      actives={this.state.diets}
                    />

                    <Stack spacing={4}>
                      <FormLabel fontSize="40px">Instructions:</FormLabel>

                      <Textarea
                        id="instructions"
                        name="instructions"
                        value={this.state.instructions}
                        placeholder="Recipe Instructions..."
                        onChange={this.handleOnChange}
                        className={s.input}
                        backgroundColor="rgba(255, 255, 255, 0.9)"
                        height="200px"
                        width="280px"
                        padding="10px"
                        fontSize="16px"
                      />
                    </Stack>
                  </Box>
                  <Spacer w="30px"></Spacer>
                </Box>
                <Box display="flex" flexDirection="row" width="100%">
                  <div style={{ width: "70%", margin: "auto" }}>
                    <ReactSearchAutocomplete
                      showClear
                      showNoResultsText="No ingredients finded..."
                      items={this.props.ingredients}
                      onSelect={this.handleOnSelect}
                      autoFocus
                      formatResult={this.formatResult}
                      placeholder="Ingredients search"
                    />
                  </div>
                  <div
                    style={{ width: "100%", padding: "20px", margin: "auto" }}
                  >
                    {this.state.ingredients.length ? (
                      <IngredientsList
                        items={this.state.ingredients}
                        onChange={this.handleOnChange}
                        onUnitChange={this.handleOnUnitChange}
                        itemButton={{
                          caption: "Remove",
                          action: this.handleOnDelete,
                        }}
                      />
                    ) : (
                      <p
                        style={{
                          fontSize: "smaller",
                          paddingBottom: "20px",
                          color: "red",
                        }}
                      >
                        Recipe must have at least one ingredient
                      </p>
                    )}
                  </div>

                  <Flex>
                    <Box
                      width="400px"
                      h="20"
                      backgroundColor="rgba(255, 255, 255, 0.7)"
                      opacity="70%"
                      align="center"
                    >
                      <p className={s.cost}>
                        Estimated cost of recipe: <br />{" "}
                        {this.state.ingredients
                          .reduce((aux, el) => aux + el.price * el.amount, 0)
                          .toFixed(2)}
                      </p>
                      <Input
                        type="submit"
                        value="Submit"
                        isDisabled={Object.values(this.state.error).includes(
                          true
                        )}
                        variantColor="teal"
                        align="center"
                        variant="filled"
                        size="lg"
                        m={4}
                        mt={8}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Flex>
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
