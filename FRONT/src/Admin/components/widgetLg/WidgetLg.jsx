import React from "react";
import "./widgetLg.css";
const { REACT_APP_BACK_URL } = process.env;
import UserRichard from "../../../img/UserRichard.png";
import { useEffect, useState } from "react";
import s from "../../../pages/Orders/Orders.module.css";
import {Table} from "@chakra-ui/react";


export default function WidgetLg(props) {

 const [state, setState] = useState({ orders: null, orderActive: null });
  const user = JSON.parse(localStorage.getItem("MANGIARE_user"));

  /*
    useEffect(() => {
        console.log(state.orders);
    }, [state.orders]);
*/

  useEffect(() => {
    fetch(
      `${REACT_APP_BACK_URL}/orders?id=${user.id}&email=${user.email}${
        props.all ? "&all=true" : ""
      }`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setState({ ...state, orders: data });
      });
  }, []);

  const handlePay = (preferenceId) => {
    window.open(
      `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`,
      "_self"
    );
  };

  const handleStatus = async (status, orderId) => {
    fetch(`${REACT_APP_BACK_URL}/orders`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, orderId, userId: user.id }),
    })
      .then((resp) => resp.json())
      .then((order) => {
        console.log(order);
        setState({
          ...state,
          orders: state.orders.map((el) =>
            el.id === order.id ? { ...el, status: order.status } : el
          ),
        });
      });
  };


  return (
    <div>
    <h3 className="widgetLgTitle">The Latest Transactions</h3>
    <table width="100%" className={s.ordersTable}>
      <thead>
        <tr>
          {props.all ? <th>User Email</th> : ""}
          <th>Order#</th>
          <th>createdAt</th>
          <th>Ingredients#</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {state.orders?.slice(-7).map((el, idx) => (
          <React.Fragment key={idx}>
            <tr
              className={
                el.id === state.orderActive ||
                (!state.orderActive && el.id == props.order_id)
                  ? s.orderItem
                  : idx % 2
                  ? ""
                  : s.par
              }
              
            >
              {props.all ? <td>{el.User.email}</td> : ""}
              <td>{el.id}</td>
              <td>{el.createdAt}</td>
              <td>{el.Order_details.length}</td>
              <td>
                {el.status === 0
                  ? "Payment pending"
                  : el.status === 1
                  ? "Stock pending"
                  : el.status === 2
                  ? "In preparation"
                  : el.status === 3
                  ? "Sent"
                  : "Canceled"}
              </td>
              <td>
                {!el.status ||
                (el.status === 1 && user.role !== null && props.all) ? (
                  <button onClick={() => handleStatus(4, el.id)}>Cancel</button>
                ) : (
                  ""
                )}

                {!el.status && user.id == el.userId ? (
                  <button onClick={() => handlePay(el.preferenceId)}>
                    Pay
                  </button>
                ) : (
                  ""
                )}

                {el.status === 2 && user.role !== null && props.all ? (
                  <button onClick={() => handleStatus(3, el.id)}>Send</button>
                ) : (
                  ""
                )}
              </td>
            </tr>
            {state.orderActive === el.id ||
            (!state.orderActive && el.id == props.order_id) ? (
              <tr className={s.orderItem}>
                <td colSpan={props.all ? 6 : 5} style={{ padding: "30px 0" }}>
                  <IngredientsList
                    items={el.Order_details.map(
                      ({ IngredientId, amount, unit, price, Ingredient }) => ({
                        id: IngredientId,
                        amount,
                        unit,
                        price,
                        name: Ingredient.name,
                      })
                    )}
                    orderDetail={true}
                  />
                </td>
              </tr>
            ) : (
              ""
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
  );
}