import React from "react";
import { useState, useEffect } from "react";

export default function Item(props) {
  // code structure re: basket text kept here to build on

  const [counter, setCounter] = useState(0);
  const [basketText, setBasketText] = useState("Add to Basket");
  const [inBasket, setInBasket] = useState(false);
  const [quantityInBasket, setQuantityInBasket] = useState();
  const [userID] = useState(window.localStorage.getItem("currentUserID"));
  const [basket, setBasket] = useState("");

  const changeCounter = (amount) => {
    if ((counter > 0 && amount === -1) || amount === +1) {
      setCounter((prevCounter) => prevCounter + amount);
    }

    if (counter === 0) {
      changeBasketButtonText("Add to Basket");
    } else if (!inBasket) {
      changeBasketButtonText("Add to Basket");
    } else {
      changeBasketButtonText("Update Basket");
    }
  };

  const buttonText = () => {
    // find the right batch in the basket:
    if (basket) {
      const batchObj = basket.filter(
        (batch) => batch.itemName === props.food.itemName
      );
      return batchObj;
    } else return;
  };

  // sets counter to value in basket and provides data needed to change
  // button text (temporarily unimplemented feature)
  useEffect(() => {
    fetch(`/orders/getBasketInfo/${userID}`, {})
      .then((response) => response.json())
      .then(async (data) => {
        data.orders.forEach((element) => {
          if (element.itemName === props.food.itemName) {
            setInBasket(true);
            changeBasketButtonText("In Basket");
            setCounter(element.batchQuantity);
            setQuantityInBasket(element.batchQuantity);
          }
        });
      });
  }, [props.updateBasket]);

  // gets user's basket with userID, creates Batch,
  // adds Batch to User Basket
  const addToBasket = async () => {
    let response = await fetch(`/orders/addToBasket/${userID}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemName: props.food.itemName,
        batchQuantity: counter,
        pricePerBatch: props.food.price,
      }),
    });
    if (response.status !== 201) {
      console.log("post failed, Error status:" + response.status);
    } else {
      let data = await response.json();
      props.setUpdateBasket(!props.updateBasket);
      setBasket(data.basket.orders);
    }
  };

  const changeBasketButtonText = (text) => setBasketText(text);

  return (
    <div className="m-10 place-content-evenly bg-lightgreen card w-96 shadow-xl rounded-t-lg">
      <figure>
        <img
          class="rounded-t-lg object-cover h-64 w-96 "
          src={props.food.image}
          alt="food"
        />
      </figure>
      <div className="rounded-b-lg card-body">
        <div className="bg-lightgreen text-black">
          <h1 className="card-title heading">{props.food.itemName}</h1>
          <p>Price: {props.food.price.toFixed(2)}</p>
          <p>Batch Quantity: {props.food.batchQuantity}</p>
        </div>
        <div className="card-actions justify-end w-28">
          <button
            data-cy="decrease-btn"
            class="btn btn-circle btn-sm bg-bone text-black"
            onClick={() => {
              changeCounter(-1);
            }}
          >
            -
          </button>
          <p className="text-center text-black" data-cy="counter">
            {counter}
          </p>
          <button
            data-cy="increase-btn"
            className="btn btn-circle btn-sm bg-bone text-black"
            onClick={() => {
              changeCounter(1);
            }}
          >
            +
          </button>
        </div>
        <div
          data-cy="basket-btn"
          className="btn bg-bone text-black"
          onClick={() => addToBasket()}
        >
          UPDATE BASKET
        </div>
      </div>
    </div>
  );
}
