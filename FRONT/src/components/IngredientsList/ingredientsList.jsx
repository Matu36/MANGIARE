import React, { useState } from "react";
import s from './IngredientsList.module.css';
import { Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { Table, Input, Select, Button, Icon } from "@chakra-ui/react";





export default function IngredientsList (props) {
  return (
    <Table variant ='striped' width="100%" >
      <tbody>
        {props.items.map(el => (
          <tr key={el.id}>
            <td>{el.name}</td>
            <td>
              <Input type="number" id={el.id} value={el.amount} name="ingredient" onChange={props.onChange} />
            </td>
            <td>
              <Select name="units" onChange={({target}) => props.onUnitChange(el.id, target.value)}>
                {el.units.map(unit => (
                  <option key={el.id + ' ' + unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </td>
            <td>
              <Button name="itemButton" onClick={() => props.itemButton.action(el.id)}>
                {props.itemButton.caption}
              </Button>
            </td>
            <td>
              {props.cart &&
                props.cart.some(aux => (aux.id === el.id) && (aux.unit === el.unit)) && (
                  <Link to={"/shoppingCart"}><BsCartCheck /></Link>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// export default function IngredientsList (props) {
// return (
//     <table width="100%">
//         <tbody>
//         {
//             props.items.map(el => {
//                 return (
//                 <tr key={el.id} className={s.tableRow + ` ${!el.amount && s.error}`}>
//                     <td className={s.tableCell}>{el.name}</td>
//                     <td className={s.tableCell}><input type="number" id={el.id} value={el.amount} name="ingredient" onChange={props.onChange}></input></td>
//                     <td className={s.tableCell}>
//                     <select name="units" onChange={({target}) => props.onUnitChange(el.id, target.value)}>
//                     {
//                         el.units.map(unit => <option key={el.id + ' ' + unit} value={unit}>{unit}</option>)
//                     }
//                     </select>
//                     </td>
//                     <td className={s.tableCell}><button name="itemButton" onClick={() => props.itemButton.action(el.id)}>{props.itemButton.caption}</button></td>
//                     <td className={s.tableCell}>{props.cart && props.cart.some(aux => ((aux.id === el.id) && (aux.unit === el.unit))) && <Link to = {"/shoppingCart"}><BsCartCheck /></Link>}</td>
//                 </tr>
//                 )
//                 })
//         }
//         </tbody>
//     </table>
// );
// };