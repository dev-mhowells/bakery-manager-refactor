import "./styles.css";
import React from "react";
import { useState, useEffect } from "react";
import Item from "./Item";
import Basket from "./Components/Basket";

function App() {
  const [items, setItems] = useState([]);
  const [updateBasket, setUpdateBasket] = useState(false);
  const [userID, setUserID] = useState(
    window.localStorage.getItem("currentUserID")
  );
  const [user, setUser] = useState([]);

  useEffect(() => {
    // render bakery items on page
    fetch("/items", {})
      .then((response) => response.json())
      .then(async (data) => {
        setItems(data.items);
        setUpdateBasket(!updateBasket);
      });
  }, []);

  const itemsDisplay = items.map((food) => {
    return (
      <Item
        key={food._id}
        updateBasket={updateBasket}
        setUpdateBasket={setUpdateBasket}
        food={food}
      ></Item>
    );
  });

  return (
    <div>
      <div class="navbar h-10 bg-lightgreen">
        <div class="flex-1">
          <h1 class="text-2xl">Bakery Manager</h1>
        </div>
        <Basket updateBasket={updateBasket}></Basket>
      </div>
      <div class="collapse justify-center mt-5 ml-20">
        <input type="checkbox" />
        <div class="collapse-title text-2xl font-medium">About us!</div>
        <div class="collapse-content">
          <p>
            Here's the link to our{" "}
            <a href="https://github.com/dev-mhowells/bakery-manager">github </a>
            page
          </p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="flex flex-wrap place-content-evenly">{itemsDisplay}</div>
    </div>
  );
}

export default App;
