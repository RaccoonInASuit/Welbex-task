import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    setLoading(true);
    const data = { email: email, password: password };
    axios.post("http://localhost:3001/users/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
        navigate("/");
      }
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="loginPage">
      <div className="formContainer">
        <label>E-mail</label>
        <input onChange={(e) => {setEmail(e.target.value)}} autoComplete="off" className="input" name="email" placeholder="Email"/>

        <label>Password</label>
        <input onChange={(e) => {setPassword(e.target.value)}} autoComplete="off" className="input" name="password" placeholder="Password"/>

        <LoadingButton onClick={login} type="submit" loading={loading} variant="contained" sx={{width: 500}}>
          Login
        </LoadingButton>
      </div>
    </div>
  );
};

export default LoginPage;
