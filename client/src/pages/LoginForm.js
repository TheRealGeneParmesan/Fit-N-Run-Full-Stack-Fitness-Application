import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import backLogin from "../images/backLogin.png";

import Auth from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error, data }] = useMutation(LOGIN_USER);


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    try {
      const { data } = await login({
        variables: { email, password },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.log(e);
    }

    // clear form values
    setEmail("");
    setPassword("");
  };

  return (
    <main className="loginPage" style={{ backgroundImage: `url(${backLogin})` }}>
      <div className="col-12 col-lg-10">
        <div className="loginContainer card">
          <h4 className="loginHeader card-header">Login</h4>
          <div className="card-body">
            {data ? (
              <Link to="/"></Link>
            ) : (
              <form className="loginForm" onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="loginBtn btn btn-block"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
