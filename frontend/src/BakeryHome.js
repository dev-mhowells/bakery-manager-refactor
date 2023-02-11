import ClearLocalStorage from "./logout";
import { Link } from "react-router-dom";

export default function BakeryHome() {
  // modal display - company, date ordered, date needed by, dropdown to show order

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10/12 h-10/12 rounded-md bg-bone flex justify-center border-8 border-green p-2">
        {/* modal */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Congratulations random Internet user!
            </h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                Yay!
              </label>
            </div>
          </div>
        </div>

        <div className="card w-96 shadow-xl bg-darkgreen">
          <figure className="px-10 pt-10">
            <img src="logoBM8.png" alt="logo" class="rounded-full" />
          </figure>
          <div className="card-body items-center text-center bg-darkgreen">
            {/* <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p> */}
            <div className="card-actions">
              <Link to="/addItem" className="btn-block">
                <button class="btn bg-beige text-bone btn-block">
                  Add more items
                </button>
              </Link>
              <label for="my-modal" class="btn bg-beige text-bone btn-block">
                Upcoming orders
              </label>
              <Link to="/" className="btn text-bone bg-beige btn-block">
                <label>Home page</label>
              </Link>
              <Link to="/login" className="btn text-bone bg-beige btn-block">
                <label onClick={ClearLocalStorage()}>Logout</label>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
