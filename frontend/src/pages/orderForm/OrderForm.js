import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [orderSummary, setOrderSummary] = useState([]);
  const [dateNeededBy, setDateNeededBy] = useState("");
  const [userId] = useState(window.localStorage.getItem("currentUserID"));

  useEffect(() => {
    fetch(`/orders/getBasketInfo/${userId}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setCompanyName(data.companyName);
        setOrderSummary(data.orders);
      })
      .catch((error) => console.error(error));
  }, []);

  // move basket into baker,
  // clear user basket
  // create invoice

  const placeOrder = (event) => {
    event.preventDefault();
    if (dateNeededBy !== "") {
      fetch(`/orders/placeOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      })
        .then(() => {
          navigate("/confirmation");
        })
        .catch((error) => console.error(error));
    }
  };

  const orderSummaryDisplay = orderSummary.map(
    ({ batchQuantity, itemName, pricePerBatch }) => {
      return (
        <div>
          <p>-----------------------------------------</p>
          <p>
            {batchQuantity} | {itemName} | £{pricePerBatch}
          </p>
        </div>
      );
    }
  );

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

      <div className="flex items-center justify-center h-screen">
        <div className="h-screen pt-20 font-sans bg-grey-lighter">
          <div className="container flex items-center justify-center mx-auto mt-20">
            <div className="block max-w-md p-6 rounded-lg shadow-lg bg-lightgreen">
              <form>
                <h1 className="mb-12 text-3xl text-center font-heading">
                  Order Form
                </h1>
                <div className="mb-6 form-group">
                  <div
                    type="text"
                    className="form-control block
                  h-10
                  w-96
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    data-cy="company_name"
                    placeholder="Company Name"
                  >
                    {" "}
                    {companyName}
                  </div>
                </div>
                <div className="mb-6 form-group">
                  <div
                    type="text"
                    className="form-control block
                  w-96
                  h-auto
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    data-cy="order_summary"
                    placeholder="Order Summary"
                  >
                    {orderSummaryDisplay}
                  </div>
                </div>
                <div className="mb-6 form-group">
                  <input
                    type="date"
                    className="form-control block
                  w-96
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    data-cy="needed_by_date"
                    placeholder="Date needed by"
                    value={dateNeededBy}
                    onChange={(e) => setDateNeededBy(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button
                    type="submit"
                    className="
                btn
                w-full
                px-6
                py-2.5
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-#A9A9A9 hover:shadow-lg
                focus:bg-#A9A9A9 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-#A9A9A9 active:shadow-lg
                transition
                duration-150
                ease-in-out"
                    onClick={(e) => {
                      placeOrder(e);
                    }}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
