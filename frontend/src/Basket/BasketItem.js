import React from "react";
import { useState, useEffect } from "react";

export default function BasketItem(props) {
  return (
    <div>
      <p>-----------------------------------------</p>
      <p>
        {props.item.batchQuantity} | {props.item.itemName} | £
        {props.item.pricePerBatch}
      </p>
    </div>
  );
}
