import React, { useState, useEffect } from "react";
import {Route, Routes, Link} from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import LoginPage from "./components/LoginPage/LoginPage";
import BlogPage from "./components/BlogPage/BlogPage";
import Post from "./components/Post/Post";
import { AuthContext } from "./components/helpers/AuthContext";
import axios from "axios";
import "./App.css";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/users/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="navigationBar">
          <div className="linkContainer">
            <Link to="/">Blog</Link>
            {!authState && (
              <>
                <Link to="login">Login</Link>
                <Link to="registration">Registration</Link>
              </>
            )}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<BlogPage/>} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="registration" element={<RegistrationPage/>} />
          <Route path="/post/:id" element={<Post/>}/>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
