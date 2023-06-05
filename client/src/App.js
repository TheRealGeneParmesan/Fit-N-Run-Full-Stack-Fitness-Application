import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Strength from "./pages/StrengthPage";
import ExerciseList from "./pages/Excercises";
import Profile from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import Login from "./pages/LoginForm";
import Signup from "./pages/SignupForm";
import Cardio from "./pages/CardioPage";
import History from "./pages/History";
import Donation from "./pages/Donation";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Auth from "./utils/auth";
import Stopwatch from "./pages/Stopwatch";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(Auth.loggedIn());
    };
    checkLoginStatus();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={isLoggedIn ? <Profile /> : <Signup />}
            />
            <Route path="/cardio" element={<Cardio />} />
            <Route path="/strength" element={<Strength />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/exercises" element={<ExerciseList />} />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
            <Route path="/donate" element={<Donation />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
};

export default App;
