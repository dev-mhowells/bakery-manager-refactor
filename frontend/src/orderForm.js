import './styles.css';
import React from 'react';
import { useState, useEffect } from 'react';

const OrderForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [order, setOrderSummary] = useState("");
  const [dateNeededBy, setDateNeededBy] = useState ("");


  useEffect(() => {
    fetch('/orders', { //specify the localhost
      method: "get",
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setCompanyName(data.orders[0].company)
        setOrderSummary(data.orders[0].orders)
  
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/orders', {
      method: "post",
      body: JSON.stringify({ date: dateNeededBy })
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch(error => console.error(error));
  };

console.log("outside:",companyName)
  return (
  <div className="flex items-center justify-center h-screen">
    <div className="h-screen pt-20 font-sans bg-grey-lighter">
        <div className="container flex items-center justify-center mx-auto mt-20">
          <div className="block max-w-md p-6 bg-white rounded-lg shadow-lg">
            <form>
              <div className="mb-6 form-group">
                <div type="text" className="form-control block
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" data-cy="company_name"
                  placeholder="Company Name">Company Name: {companyName}</div>
              </div>
              <div className="mb-6 form-group">
                <div type="text" className="form-control block
                  w-96
                  h-40
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" data-cy="order_summary"
                  placeholder="Order Summary">{order}
                  </div>
              </div>
              <div className="mb-6 form-group">
                <input type="date" className="form-control block
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" data-cy="needed_by_date"
                  placeholder="Date needed by"
                  value={dateNeededBy}
                  onChange={e => setDateNeededBy(e.target.value)}></input>
              </div>
              <div>
              <button type="submit" className="
                w-full
                px-6
                py-2.5
                bg-blue-600
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out"
                onSubmit={handleSubmit} >Send</button>
              </div>
            </form>
          </div>
        </div>
    </div>
    </div>
  );
}

export default OrderForm;