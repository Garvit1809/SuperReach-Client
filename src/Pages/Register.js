import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from '../api/APIRoutes'

const Section = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;

    .registerWrapper{
      width: 70%;
    height: 70%;
    display: flex;
    }
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-right: 2rem;
    padding-bottom: 7rem;
    /* border: 1px solid red; */

    .RegisterLogo{
      font-size: 50px;
    font-weight: 800;
    color: #1775ee;
    margin-bottom: 10px;
    }

    .registerDesc{
      font-size: 24px;
      text-align: center;
      /* border: 1px solid red; */
    }
`

const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);

    .registerBox{
      height: 400px;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .registerInput{
      height: 50px;
      border-radius: 10px;
      border: 1px solid gray;
      font-size: 18px;
      padding-left: 20px;

      &:focus{
        outline: none;
      }
    }

    .registerButton{
      height: 50px;
      border-radius: 10px;
      border: none;
      background-color: #1775ee;
      color: white;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
    }

    .loginRegisterButton{
      width: 60%;
      align-self: center;
      height: 50px;
      border-radius: 10px;
      border: none;
      background-color: #42b72a;
      color: white;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      
      a{
        text-decoration: none;
        font-weight: 500;
        color: white
      }
    }
`

const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  // ???????? Commented so new users could be registered with ease ????????

  // useEffect(() => {
  //       if(localStorage.getItem('super-reach-user')) {
  //         navigate('/');
  //       }
  //     }, []);

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = user;
    if (password !== confirmPassword) {
        toast.error("password and confirm password should be same.", toastOptions);
        return false;
    } else if (username.length < 3) {
        toast.error("Username should be greater than 3 characters", toastOptions);
        return false;
    } else if (password.length < 3) {
        toast.error("Password should be equal or greater than 3 characters", toastOptions);
        return false;
    } else if (email==="") {
        toast.error("Email is required", toastOptions);
        return false;
    }
    return true;
}

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = user;
      const { data } = await axios.post(registerRoute, {
        username,email,password
    });
    if (data.status === false) {
        toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
        localStorage.setItem("super-reach-user", JSON.stringify(data.user));
        navigate("/profile");
    }
    }
  }

  return (
    <>
    <Section>
    <div className="registerWrapper">
    <Left>
    <h3 className="RegisterLogo">SuperReach</h3>
          <span className="registerDesc">
          Helping businesses get 4x higher conversion on their sales reachouts using prospecting and communication intelligence
          </span>
        </Left>
        <Right>
          <div className="registerBox">
          <form className="registerBox" onSubmit={handleSubmit}>
          <input placeholder="Username" className="registerInput" type="text" name='username' onChange={(e) => handleChange(e)} />
          <input placeholder="Email" className="registerInput" type="email" name="email" onChange={(e) => handleChange(e)} />
          <input placeholder="Password" className="registerInput" type="password" name="password"  onChange={(e) => handleChange(e)}/>
          <input placeholder="Confirm Password" className="registerInput" type="password" name="confirmPassword" onChange={(e) => handleChange(e)}/>
          <button className="registerButton" type='submit'>Sign Up</button>
          </form>
            <button className="loginRegisterButton">
            <Link to="/login" >
            Log into Account
            </Link>
            </button>
          </div>
        </Right>
      </div>
    </Section>
    <ToastContainer/>
    </>
  )
}

export default Register