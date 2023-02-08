import React from 'react';
import { useState, useEffect } from 'react';

const BatchOrder = (props) => {

  const [itemTotalBatchQuantity, setItemTotalBatchQuantity] = useState([]);

  useEffect(() => {
    fetch(`items/${props.batchOrder.itemName}`, {
    })
        .then(response => response.json())
        .then(async data => {
      setItemTotalBatchQuantity(data[0].batchQuantity)
    });
}, [])
  
    return(
      <div>
        <div className="divider"></div>
            <p>{props.batchOrder.itemName} | {(props.batchOrder.batchQuantity) * (itemTotalBatchQuantity)} </p>
            {/* need to add date due by, sort by soonest date */}
      </div>
    )
};
  
export default BatchOrder;