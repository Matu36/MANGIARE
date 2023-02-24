import s from "./UserOrdersBox.module.scss";
import React from "react";

const UserOrdersBox = () => {
  let orders = [
    {
      id: 1,
      status: "pending",
      userId: 6,
      amount: 1600,
    },
    {
      id: 2,
      status: "dispached",
      userId: 6,
      amount: 800,
    },
    {
      id: 3,
      status: "canceled",
      userId: 6,
      amount: 360,
    },
  ];

  return (
    <div className={s.container}>
      <div className={s.titleDiv}>
        <h2>Your orders</h2>
      </div>
      <div className={s.cardContainer}>
        <div className={s.tableHeaders}>
          <p>Order N°</p>
          <p>Amount ($)</p>
          <p>Status</p>
        </div>
        {orders.length > 0 ? (
          orders.map(({ id, status, userId, amount }, i) => {
            return (
              <div className={s.orderItem} key={id}>
                <p className={s.pDiv}>{id}</p>
                <p className={s.pDiv}>{amount}</p>
                <p
                  className={
                    status === "canceled"
                      ? s.statusCanceled
                      : status === "pending"
                      ? s.statusPending
                      : s.statusDispached
                  }
                >
                  {status}
                </p>
              </div>
            );
          })
        ) : (
          <div className={s.noRecipesDiv}>
            <p>No orders yet. Go to shop!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrdersBox;
