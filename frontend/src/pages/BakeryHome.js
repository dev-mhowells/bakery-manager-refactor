import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BakeryHome() {
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  useEffect(() => {
    fetch("/bakers/getOrders", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setConfirmedOrders(data.confirmedOrders));
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  const allOrders = confirmedOrders?.map((order, index) => {
    const batches = order.orders.map((batch) => {
      return (
        <>
          <p>
            {batch.itemName} | x{batch.batchQuantity}
          </p>
          <br></br>
        </>
      );
    });

    return (
      <tr>
        <th>{index}</th>
        <td className="font-bold">{order.companyName}</td>
        <td>{batches}</td>
        <td>£{order.totalPrice}</td>
      </tr>
    );
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10/12 h-10/12 rounded-md bg-bone flex justify-center border-8 border-green p-2">
        {/* modal */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box max-w-none">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Upcoming orders:</h3>
            <br></br>

            <div class="overflow-x-auto">
              <table class="table table-compact w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Company</th>
                    <th>Order</th>
                    <th>Amount payed</th>
                  </tr>
                </thead>
                <tbody>{allOrders}</tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Company</th>
                    <th>Order</th>
                    <th>Amount payed</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="card w-96 shadow-xl bg-darkgreen">
          <figure className="px-10 pt-10">
            <img src="logoBM8.png" alt="logo" class="rounded-full" />
          </figure>
          <div className="card-body items-center text-center bg-darkgreen">
            <div className="card-actions">
              <Link to="/addItem" className="btn-block">
                <button class="btn bg-beige text-bone btn-block">
                  Add more items
                </button>
              </Link>
              <label for="my-modal-3" class="btn bg-beige text-bone btn-block">
                Upcoming orders
              </label>
              <Link to="/" className="btn text-bone bg-beige btn-block">
                <label>Home page</label>
              </Link>
              <Link to="/login" className="btn text-bone bg-beige btn-block">
                <label onClick={clearLocalStorage}>Logout</label>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
