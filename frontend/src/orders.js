import React from 'react';
import { useState, useEffect } from 'react';
import BatchOrder from './batchOrder'


export default function Orders(props) {
    
    const [allBatchOrders, setAllBatchOrders] = useState([]);


    useEffect(() => {
        fetch("batchOrders/getAll", {
        })
            .then(response => response.json())
            .then(async data => {
                // console.log(data)
          setAllBatchOrders(data)
        });
    }, [])

    console.log("ALL BATCH ORDERS:", allBatchOrders)
    const batchOrdersDisplay = allBatchOrders.map((batchOrder) => {
        // JSON.stringify(batchOrder)
        return <BatchOrder batchOrder={batchOrder}></BatchOrder>
    })

    
    return (
        <div>
            <h1>Upcoming orders</h1>
            <div >{batchOrdersDisplay}</div>
        </div>
    )
}