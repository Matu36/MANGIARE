import React, { useState } from "react";
import s from "./IngredientsList.module.css";
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import {
  Table,
  Input,
  Select,
  Button,
  Icon,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function IngredientsList(props) {
  return (
    <Table variant="striped" width="100%">
      <Thead>
        <Tr>
          <Th textAlign="center">Ingredient</Th>
          <Th textAlign="center">Amount</Th>
          <Th display={["none", "none", "table-cell", "table-cell"]} textAlign="center">Measure Unit</Th>
          <Th textAlign="center">
            {props.orderDetail ? "Unit Price" : "Action"}
          </Th>
          {props.orderDetail ? <Th textAlign="center">'Total Price'</Th> : ""}
        </Tr>
      </Thead>
      <tbody>
        {props.items.map((el, idx) => (
          <tr key={idx}>
            <td>{el.name}</td>
            <td>
              {props.orderDetail ? (
                Math.round(parseFloat(el.amount) * 100) / 100
              ) : (
                <Input
                  type="number"
                  id={el.id}
                  value={Math.round(parseFloat(el.amount) * 100) / 100}
                  name="ingredient"
                  onChange={(event) => props.onChange(event, el.unit)}
                />
              )}
            </td>
            <Td display={["none", "none", "table-cell", "table-cell"]}>
              {props.orderDetail ? (
                el.unit
              ) : (
                <Select
                  name="units"
                  onChange={({ target }) =>
                    props.onUnitChange &&
                    props.onUnitChange(el.id, target.value)
                  }
                >
                  {el.units.map((unit) => (
                    <option key={el.id + " " + unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </Select>
              )}
            </Td>
            <td>
              {props.orderDetail ? (
                `$${el.price.toFixed(2)}`
              ) : (
                <Button
                  name="itemButton"
                  onClick={() => props.itemButton.action(el.id, el.unit)}
                >
                  {props.itemButton.caption}
                </Button>
              )}
            </td>
            <td>
              {el.inCart ? (
                <Link to={"/shoppingCart"}>
                  <BsCartCheck />
                </Link>
              ) : (
                " "
              )}
              {props.orderDetail
                ? `$${(el.price * el.amount).toFixed(2)}`
                : " "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
