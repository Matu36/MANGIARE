import React from "react";
import { Box, Text, List } from "@chakra-ui/react";

export default class Diets extends React.Component {
  handleClick = event => {
    this.props.onChange(
      this.props.actives.includes(event.target.id)
      ? this.props.actives.filter(aux => aux !== event.target.id)
      : [...this.props.actives, event.target.id]
    );
  }

  render() {
    let diets = this.props.diets.map(el =>
      <div key={el}>
        <input type="checkbox" id={el} name={el} checked={this.props.actives.includes(el)} onChange={this.handleClick} />
        <label htmlFor={el}>{el}</label>
      </div>
    )

return (
  <Box display="flex" flexDirection="row" justifyContent="left" alignItems="center">
  <Text
    fontSize={{ base: "15px", md: "20px", lg: "30px" }}
    textAlign="left"
    fontWeight="bold"
    color="teal.600"
    marginTop="20px"
  >
    Choose diet's recipe
  </Text>
  <Box width="50%" marginLeft="20px">
  <List spacing={3}>
  <Text fontFamily="heading" fontSize="large" color="green" fontWeight="bold">
  {diets}
  </Text>
    </List>
    
  </Box>
  
</Box>
);
}
    
  }
