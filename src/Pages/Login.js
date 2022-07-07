import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../api/APIRoutes";

const Section = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;

  .loginWrapper {
    width: 70%;
    height: 70%;
    display: flex;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-right: 2rem;
  padding-bottom: 5rem;

  .loginLogo {
    font-size: 50px;
    font-weight: 800;
    color: #1775ee;
    margin-bottom: 10px;
  }

  .loginDesc {
    font-size: 24px;
    text-align: center;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .loginBox {
    height: 300px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .loginInput {
    height: 50px;
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 18px;
    padding-left: 20px;
  }

  .loginInput:focus {
    outline: none;
  }

  .loginButton {
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #1775ee;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
  }

  .loginForgot {
    text-align: center;
    color: #1775ee;
    padding-bottom: 0.8rem;
  }

  .loginRegisterButton {
    width: 60%;
    align-self: center;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #42b72a;
    cursor: pointer;
    /* margin-top: 0.3rem; */

    a {
      color: white;
      text-decoration: none;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  // useEffect(() => {
  //   if(localStorage.getItem('super-reach-user')) {
  //     navigate('/');
  //   }
  // }, []);

  const handleValidation = () => {
    const { password, username } = user;
    if (password === "") {
        toast.error("Enter your password", toastOptions);
        return false;
    } else if (username === "") {
        toast.error("Username can't be blank!!", toastOptions);
        return false;
    } 
    return true;
}

const handleChange = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value })
};


const handleSubmit = async (e) => {
  e.preventDefault();
  if(handleValidation()){
      const { password, username} = user;
      const { data } = await axios.post(loginRoute, {
          username,password
      });
      if (data.status === false) {
          toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
          localStorage.setItem("super-reach-user", JSON.stringify(data.user));
          navigate("/");
      }
  }
};

  return (
    <>
    <Section>
    <div className="loginWrapper">
        <Left>
          <h3 className="loginLogo">SuperReach</h3>
          <span className="loginDesc">
            Helping businesses get 4x higher conversion on their sales reachouts
            using prospecting and communication intelligence
          </span>
        </Left>
        <Right>
          <div className="loginBox">
            <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
              <input placeholder="Username" className="loginInput" type="text" name="username" onChange={(e) => handleChange(e)}/>
              <input placeholder="Password" className="loginInput" type="password" name="password" onChange={(e) => handleChange(e)}/>
              <button className="loginButton" type="submit">Log In</button>
            </form>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              <Link to="/register">Create a New Account</Link>
            </button>
          </div>
        </Right>
      </div>
      </Section>
      <ToastContainer/>
    </>
  );
};

export default Login;
