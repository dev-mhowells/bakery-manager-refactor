import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        companyName: companyName,
        address: address,
        phoneNumber: phoneNumber,
        typeOfBusiness: typeOfBusiness,
      }),
    });
    if (response.status !== 201) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="hero min-h-screen bg-lightgreen">
      <div className="flex">
        <div className="w-1/2">
          <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div class="max-w-md mx-auto w-96">
              <img src="logoBM8.png"></img>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
              <div class="relative px-4 py-10 bg-bone border-b-8 border-r-8 border-beige drop-shadow-lg sm:rounded-3xl sm:p-20">
                <div class="max-w-md mx-auto w-96">
                  <div>
                    <h1 className=" text-3xl text-center font-heading">
                      Signup
                    </h1>
                  </div>
                  <div class="divide-y divide-gray-200">
                    <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <form onSubmit={handleSubmit}>
                        <div class="relative">
                          <input
                            autoComplete="off"
                            id="companyName"
                            name="companyName"
                            type="text"
                            class="peer placeholder-transparent h-10 w-full rounded-md text-gray-900 mb-4 focus:outline-none focus:borer-rose-600"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                          <label
                            for="companyName"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            Company Name
                          </label>
                        </div>
                        <div class="relative">
                          <input
                            autoComplete="off"
                            id="typeOfBusiness"
                            name="typeOfBusiness"
                            type="text"
                            class="peer placeholder-transparent h-10 w-full mb-4 rounded-md text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Type of business"
                            value={typeOfBusiness}
                            onChange={(e) => setTypeOfBusiness(e.target.value)}
                          />
                          <label
                            for="typeOfBusiness"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            Type of business
                          </label>
                        </div>
                        <div class="relative">
                          <input
                            autoComplete="off"
                            id="address"
                            name="address"
                            type="text"
                            class="peer placeholder-transparent h-10 w-full mb-4 rounded-md text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Type of business"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <label
                            for="address"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            Address
                          </label>
                        </div>
                        <div class="relative">
                          <input
                            autoComplete="off"
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            class="peer placeholder-transparent h-10 w-full mb-4 rounded-md text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Type of business"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          <label
                            for="phoneNumber"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            Phone number
                          </label>
                        </div>
                        <div class="relative">
                          <input
                            autoComplete="off"
                            id="email"
                            name="email"
                            type="text"
                            class="peer placeholder-transparent h-10 w-full mb-4 rounded-md text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label
                            for="email"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            Email Address
                          </label>
                        </div>
                        <div class="relative">
                          <input
                            autoComplete="off"
                            id="password"
                            name="password"
                            type="password"
                            class="peer placeholder-transparent h-10 w-full rounded-md text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            for="password"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            Password
                          </label>
                        </div>
                        <div class="mt-6 relative">
                          <button
                            type="submit"
                            value="Submit"
                            className="
														btn
														w-full
														px-6
														py-2.5
														text-white
														font-medium
														rounded-md
														text-s
														leading-tight
														uppercase
														shadow-md
														hover:bg-#A9A9A9 hover:shadow-lg
														focus:bg-#A9A9A9 focus:shadow-lg focus:outline-none focus:ring-0
														active:bg-#A9A9A9 active:shadow-lg
														transition
														duration-150
														ease-in-out mb-5"
                            onSubmit={handleSubmit}
                          >
                            Signup
                          </button>
                        </div>
                      </form>
                      <Link to="/login">
                        <b class="text-blue underline mt-10">
                          Already have an account? Log in here!
                        </b>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
