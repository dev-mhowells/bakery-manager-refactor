import React from "react";
// import CalendarTable from "./calendar";
import Orders from "./orders";
import ClearLocalStorage from "./logout";

export default function BakeryIndex() {
  <script src="../path/to/fullcalendar.min.js"></script>;

  return (
    <div className="overflow-auto">
      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative overflow-auto">
          <label
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Orders></Orders>
        </div>
      </div>
      <body className="overflow-auto">
        <div className="flex">
          <div className=" mt-5 ml-20 w-10/12 h-10/12 rounded-md">
            <div className="flex justify-center px-4 py-96 bg-base-200 border-8 border-green rounded-md">
              {/* company photo */}
              <div className="card  mt-10 h-96 w-96 top-10 left-80 bg-bone bg-logo rounded-full">
                <figure class="px-30 pt-30">
                  <img src="logoBM8.png" alt="logo" class="rounded-full" />
                </figure>
              </div>
              {/* company name */}
            </div>
            {/* cards that contain 3 elements */}
            <div className="fixed mt-40 top-80 left-80 right-30 card-body bg-darkgreen card shadow-xl w-96">
              <button class="btn bg-beige text-bone btn-block">
                <a href="/addItem">Add more items</a>
              </button>
              <label for="my-modal-3" class="btn bg-beige text-bone btn-block">
                Upcoming orders
              </label>
              <label htmlFor="my-modal" className="btn text-bone bg-beige">
                <a href="/">Home page</a>
              </label>
              <label
                htmlFor="my-modal"
                className="btn text-bone bg-beige"
                onClick={ClearLocalStorage()}
              >
                <a href="/login">Logout</a>
              </label>
              {/* calendar */}
              <div className="fixed mt-60 top-60 right-80 w-96 h-96 border-solid border-5 border-green mb-10">
                {/* <CalendarTable></CalendarTable> */}
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}
