import React from "react";
import "./widgetLg.css";
import UserRichard from "../../../img/UserRichard.png";

export default function WidgetLg() {

  

const Button = ({type}) => {
  return <button className= {"widgetLgButton " + type}> {type} </button>
}

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
<<<<<<< HEAD
      </thead>
      <tbody>
        {state.orders?.slice(-6).map((el, idx) => (
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
=======
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src={UserRichard} alt="foto" className="widgerLgImg" />
            <span className="widgetLgName">Ricardo Lafranconi</span>
          </td>
          <td className="widgetLgDate">2 jun 2021</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus"> <Button type = "Declined" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src={UserRichard} alt="foto" className="widgerLgImg" />
            <span className="widgetLgName">Ricardo Lafranconi</span>
          </td>
          <td className="widgetLgDate">2 jun 2021</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus"> <Button type = "Pending" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src={UserRichard} alt="foto" className="widgerLgImg" />
            <span className="widgetLgName">Ricardo Lafranconi</span>
          </td>
          <td className="widgetLgDate">2 jun 2021</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus"> <Button type = "Approved" />
          </td>
        </tr>
      </table>
>>>>>>> ce21384303b18be57ed0b23e79bcf23a31d2bb1e
    </div>
  );
}
