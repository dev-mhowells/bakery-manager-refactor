import "./styles.css";
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LogInForm({}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (response.status !== 201) {
      console.log("oop");
      navigate("/login");
    } else {
      let data = await response.json();
      localStorage.clear();
      window.localStorage.setItem("currentUserID", data.userID);
      navigate(data.role === "customer" ? "/" : "/bakeryindex");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="hero min-h-screen bg-lightgreen">
      <div className="flex place-content-evenly">
        <div className="w-1/2">
          <div class="min-h-screen py-6 flex flex-col sm:py-12">
            <div class="max-w-md mx-auto w-96 mt-40">
              <img src="logoBM8.png"></img>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
              <div class="relative px-4 py-10 bg-bone border-b-8 border-r-8 border-beige drop-shadow-lg mr-30 sm:rounded-3xl sm:p-20">
                <div class="max-w-md mx-auto w-96">
                  <div>
                    <h1 className="text-3xl text-center font-heading mr-30">
                      Login here!
                    </h1>
                  </div>
                  <div class="divide-y divide-gray-200">
                    <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 mr-30">
                      <form onSubmit={handleSubmit}>
                        <div class="relative">
                          <input
                            autoComplete="off"
                            id="email"
                            name="email"
                            type="text"
                            class="peer placeholder-transparent mt-4 h-10 w-full rounded-md border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Email address"
                            value={email}
                            onChange={handleEmailChange}
                            required
                          />
                          <label
                            for="email"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm mt-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
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
                            class="peer placeholder-transparent mt-4 h-10 w-full rounded-md border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                          />
                          <label
                            for="password"
                            class="absolute left-0 -top-3.5 text-gray-600 text-sm mt-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
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
                            Login
                          </button>
                        </div>
                      </form>
                      <Link to="/signup">
                        <b class="text-blue underline">
                          Don't have an account yet? Sign up here
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

//TODO link to the login backend branch
