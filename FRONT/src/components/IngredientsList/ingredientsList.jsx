import React, { useState } from "react";
import s from './IngredientsList.module.css';
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { Table, Input, Select, Button, Icon,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, } from "@chakra-ui/react";

export default function IngredientsList (props) {
  return (
    <Table variant ='striped' width="100%" >
      <Thead>
      <Tr>
        <Th textAlign='center'>Ingredient</Th>
        <Th textAlign='center'>Amount</Th>
        <Th textAlign='center'>Measure Unit</Th>
        <Th textAlign='center'>Shopping Cart</Th>
      </Tr>
    </Thead>
      <tbody>
        {props.items.map(el => (
          <tr key={el.id}>
            <td>{el.name}</td>
            <td>
              <Input type="number" id={el.id} value={el.amount} name="ingredient" onChange={event => props.onChange(event, el.unit)} />
            </td>
            <td>
              <Select name="units" onChange={({target}) => props.onUnitChange && props.onUnitChange(el.id, target.value)}>
                {el.units.map(unit => (
                  <option key={el.id + ' ' + unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </td>
            <td>
              <Button name="itemButton" onClick={() => props.itemButton.action(el.id, el.unit)}>
                Add Item
              </Button>
            </td>
            <td>
              {el.inCart ? <Link to={"/shoppingCart"}><BsCartCheck /></Link> : <br />}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}