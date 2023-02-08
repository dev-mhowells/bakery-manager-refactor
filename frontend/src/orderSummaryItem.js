// import React from 'react';
// import { useState, useEffect} from 'react';


// export default function OrderSummaryItem(props) {
//   const [item, setItem] = useState([]);
//   const [pricePerBatch, setpricePerBatch] = useState([]);
//   const [batchQuantity, setBatchQuantity] = useState([]);
//   const [itemName, setItemName] = useState([]);

//   useEffect(() => {
//     fetch(`/orders/getBatch/${props.orderID}`, {
//     })
//       .then(response => response.json())
//       .then(async data => {
//         console.log('this is the data in the map', data[0])
//         setItem(data[0])
//         if (data[0].pricePerBatch){
//           setpricePerBatch((data[0].pricePerBatch).toFixed(2))
//           setBatchQuantity((data[0].batchQuantity))
//           setItemName((data[0].itemName))
//         }
//       })
//     }, [])

//   return(
//     <div>
//       <p>-----------------------------------------</p>
//       <p>{batchQuantity} | {itemName} | £{pricePerBatch}</p>
//     </div>
//   )

// };