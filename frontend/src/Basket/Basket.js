import React from "react";
import BasketItem from "./BasketItem";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

export default function Basket(props) {
  const [batchOrders, setBatchOrders] = useState([]);
  const [userId, setUserId] = useState(
    window.localStorage.getItem("currentUserID")
  );
  const ClearLocalStorage = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch(`orders/getBasketInfo/${userId}`, {})
      .then((response) => response.json())
      .then(async (data) => {
        setBatchOrders(data.orders);
      });
  }, [props.updateBasket]);

  console.log("these are the basket things", batchOrders);

  const getTotalPrice = () => {
    let total = 0;
    batchOrders?.forEach((element) => {
      total += element.pricePerBatch * element.batchQuantity;
    });
    return total.toFixed(2);
  };

  const basketDisplay = batchOrders?.map((item) => {
    return (
      <BasketItem
        key={item._id}
        updateBasket={props.updateBasket}
        item={item}
      ></BasketItem>
    );
  });

  const Checkout = async () => {
    let response = await fetch(`/orders/updateTotal/${userId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalPrice: getTotalPrice() }),
    });
    if (response.status !== 200) {
      console.log("post failed, Error status:" + response.status);
    } else {
      console.log("price updated ", getTotalPrice());
    }
  };

  const basketMenu = (
    <div>
      <div class="flex-1 h-12">
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <label
              tabindex="0"
              class="btn btn-ghost btn-circle dropdown-end mr-2"
            >
              <div class="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="badge badge-sm indicator-item">
                  {batchOrders.length}
                </span>
              </div>
            </label>
            <div
              tabindex="0"
              class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow text-black"
            >
              <div class="card-body">
                {basketDisplay}
                <br></br>
                <li>Total Price: £{getTotalPrice()}</li>
                <div class="card-actions">
                  <Link to="/orderform">
                    <button
                      className="btn bg-bone btn-block"
                      onClick={() => Checkout()}
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
                <a href="/login" onClick={() => ClearLocalStorage()}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div class="navbar bg-lightgreen">{basketMenu}</div>
    </div>
  );
}
