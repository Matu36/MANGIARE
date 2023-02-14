import React from "react";
import Diets from "../../components/Diets/Diets";
import { getIngredients, createRecipe } from "../../Redux/actions";
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
  Flex,
  Stack,
  FormLabel,
  Textarea,
  Spacer,
  Input,
} from "@chakra-ui/react";
import background from "../../img/BackgroundCreateRecipe.png";
//import {Redirect} from 'react-router-dom';

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      instructions: "",
      image: "",
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

  handleSubmit = (event) => {
    event.preventDefault();

    this.props
      .createRecipe({
        ...this.state,
        image: this.state.image ? this.state.image : null,
        ingredients: this.state.ingredients.map(({ id, amount, unit }) => ({
          id,
          amount,
          unit,
        })),
      })
      .then(() => {
        alert(`The Recipe '${this.state.title}' has been created!`)
        window.location.href = '/home';
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

    switch (target.name) {
      case "title":
        error.title = target.value.length < 4 || target.value.length > 25;
        break;
      case "image":
        error.image =
          target.value !== "" &&
          !/^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g.test(
            target.value
          );
        break;
      case "instructions":
        error.instructions = target.value.length < 4;
        break;
      default:
        break;
    }

    let change;

    if (target.name !== "ingredient") change = { [target.name]: target.value };
    else {
      change = {
        ingredients: this.state.ingredients.map((el) =>
          ((el.id != target.id) || (el.unit != unit))
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
        height="1200px"
        marginTop="1px"
        backgroundImage={background}
        style={{
          backgroundSize: "cover",
          filter: "contrast(100%)",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      >
        <Text fontSize="6xl" textAlign="center" fontWeight="bold" 
      color="teal.600" >
          {" "}
          Create your own Recipe!
        </Text>
        <Text fontSize='3xl' textAlign="center" fontWeight="bold" color="yellow.600" backgroundColor="white" opacity="0.5">You can save your own recipes and write your cookbook online!</Text>
        <Box
          width="100%"
          mt={38}
          style={{
            display: "flex",
            alignItems: "",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Box as="form" onSubmit={this.handleSubmit} width="80%">
            <Box display="flex" flexDirection="row" width="100%">
              <Box flex="1">
                <div className={s.body}>
                  <table style={{ width: "100%", margin: "auto" }}>
                    <tbody>
                      <tr>
                        <td width="80%">
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
                            Image URL:
                          </label>
                        </td>
                        <td>
                          <input
                            className={s.input}
                            type="url"
                            id="image"
                            name="image"
                            value={this.state.image}
                            placeholder="Recipe Image URL..."
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
                          URL must be an valid URL or empty
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Box>
              <Spacer></Spacer>

              <Box flex="1" alignContent="center">
                <Diets
                  onChange={this.handleDiets}
                  diets={this.props.diets.filter((el) => el !== "All Diets")}
                  actives={this.state.diets}
                />
              </Box>
              <Box flex="1">
                <Stack spacing={4}>
                  <Box>
                    <FormLabel fontSize='40px' >
                      Instructions:
                    </FormLabel>
                  </Box>
                  <Textarea
                    id="instructions"
                    name="instructions"
                    value={this.state.instructions}
                    placeholder="Recipe Instructions..."
                    onChange={this.handleOnChange}
                    className={s.input}
                    backgroundColor="rgba(255, 255, 255, 0.7)"
                    height="200px"
                    width="500px"
                    padding="10px"
                    fontSize="16px"
                  />
                </Stack>
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" width="100%">
              <Box flex="1">
                <div style={{ width: "50%", margin: "auto" }}>
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
                <div style={{ width: "100%", padding: "20px", margin: "auto" }}>
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
              </Box>
              <Spacer></Spacer>
              <Flex>
                <Box
                  w="250px"
                  h="20"
                  backgroundColor="rgba(255, 255, 255, 0.7)"
                  align="center"
                >
                  <p className={s.cost}>
                    Estimated cost of recipe: <br />{" "}
                    {this.state.ingredients.reduce(
                      (aux, el) => aux + el.price * el.amount,
                      0
                    ).toFixed(2)}
                  </p>
                </Box>
                <Box flex="1">
                  <Input
                    type="submit"
                    value="Submit"
                    isDisabled={Object.values(this.state.error).includes(true)}
                    variantColor="teal"
                    variant='filled'
                    size="lg"
                    m={4}
                    mt={8}
                  />
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>

      </Box>
    );
  }
}

export default connect(({ ingredients, diets }) => ({ ingredients, diets }), {
  getIngredients,
  createRecipe,
})(CreateRecipe);
