import ClearLocalStorage from "./logout";

export default function BakeryHome() {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* modal */}

      {/* The button to open modal
      <label htmlFor="my-modal" className="btn">
        open modal
      </label> */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src="logoBM8.png" alt="logo" class="rounded-full" />
        </figure>
        <div className="card-body items-center text-center">
          {/* <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p> */}
          <div className="card-actions">
            <button class="btn bg-beige text-bone btn-block">
              <a href="/addItem">Add more items</a>
            </button>
            <label for="my-modal" class="btn bg-beige text-bone btn-block">
              Upcoming orders
            </label>
            <label
              //   htmlFor="my-modal"
              className="btn text-bone bg-beige btn-block"
            >
              <a href="/">Home page</a>
            </label>
            <label
              //   htmlFor="my-modal"
              className="btn text-bone bg-beige btn-block"
              onClick={ClearLocalStorage()}
            >
              <a href="/login">Logout</a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
