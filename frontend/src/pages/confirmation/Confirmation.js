import "../../styles.css";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  const [orderSummary, setOrderSummary] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState(
    window.localStorage.getItem("currentUserID")
  );

  useEffect(() => {
    fetch(`users/getInvoice/${userId}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderSummary(data.orders);
        setOrderId(data._id);
      });
  }, []);

  const allNumbers = orderSummary?.map(
    (order) => order.pricePerBatch * order.batchQuantity
  );
  const totals = allNumbers.reduce((a, b) => a + b, 0);

  const allOrders = orderSummary?.map((order, index) => {
    const totalRow = (
      <>
        <th>Total:</th>
        <td>{totals}</td>
      </>
    );

    return (
      <>
        <tr>
          <th>{index + 1}</th>
          <td>{order.itemName}</td>
          <td>{order.pricePerBatch}</td>
          <td>{order.batchQuantity}</td>
        </tr>
        {index + 1 === orderSummary.length && totalRow}
      </>
    );
  });

  // confirmation message
  return (
    <div>
      <div class="navbar h-10 bg-lightgreen">
        <div class="flex-1">
          <h1 class="text-2xl">Bakery Manager</h1>
        </div>
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full ">
                <img src="logoBM8.png" />
              </div>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <a href="/profile" class="justify-between">
                  Profile
                  <span class="badge">Check it out!</span>
                </a>
              </li>
              <li>
                <a href="/login">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex mt-20 place-content-evenly">
        <div className=" card bg-lightgreen drop-shadow-xl place-content-center border-beige w-100">
          <div className="card-body">
            <div className="text-center">
              <h1 className="mb-12 text-3xl text-center font-heading">
                Order Invoice
              </h1>
            </div>
            <div
              className="text-center orderText"
              data-cy="confirmation_message"
            >
              <h2>
                <b>Your order is confirmed</b>
              </h2>
            </div>
            <h2 className="text-center orderID">Order ID: {orderId}</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price per batch</th>
                    <th>Number Ordered</th>
                  </tr>
                </thead>
                <tbody>{allOrders}</tbody>
              </table>
            </div>
            <div className="justify-center card-actions">
              <button className="btn ">
                <Link to="/">Home</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
