import React, { useState } from "react";
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
        <Th textAlign='center'>{props.orderDetail ? 'Unit Price' : 'Action'}</Th>
        {props.orderDetail ? <Th textAlign='center'>'Total Price'</Th> : ''}
      </Tr>
    </Thead>
      <Tbody>
        {props.items.map((el, idx) => (
          <Tr key={idx}>
            <Td>{el.name}</Td>
            <Td>
              {props.orderDetail ? el.amount : <Input type="number" id={el.id} value={el.amount} name="ingredient" onChange={event => props.onChange(event, el.unit)} />}
            </Td>
            <Td>
              {
                props.orderDetail
                  ? el.unit
                  : 
                    <Select name="units" onChange={({target}) => props.onUnitChange && props.onUnitChange(el.id, target.value)}>
                      {el.units.map(unit => (
                        <option key={el.id + ' ' + unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </Select>
              }
            </Td>
            <Td>
            {
                props.orderDetail
                  ? `$${el.price.toFixed(2)}`
                  : 
                    <Button name="itemButton" onClick={() => props.itemButton.action(el.id, el.unit)}>
                      {props.itemButton.caption}
                    </Button>
            }
            </Td>
            <Td>
              {el.inCart ? <Link to={"/shoppingCart"}><BsCartCheck /></Link> : ' '}
              {props.orderDetail ? `$${(el.price * el.amount).toFixed(2)}` : ' '}
              {/* {props.orderDetail ? total+=(el.price * el.amount).toFixed(2) : total+=0} */}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}