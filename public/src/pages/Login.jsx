import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/еее.png";
// import back_img from "../assets/2205_w015_n001_830a_p30_830.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import back from "./login.css"
import Error from "../components/error";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  // let styles = {
  //     backgroundImage: 'url(' + back_img + ')',
  //     backgroundSize: 'cover',
  //     overflow: 'hidden',
  // }

  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }


  if(windowSize.innerWidth < 666) return <><Error/></>

  return (
    <>
      <FormContainer className={back}>
        <form action=""  onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/*<img src={Logo} alt="logo" />*/}
            <h1>START GAME</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  //flex-direction: column;
  justify-content: end;
  float: right;
  gap: 3rem;
  align-items: center;
  //background-color: #131324;
  .brand {
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      //text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    //gap: 6rem;
    height: 70vh;
    width: 65vh;
    background: linear-gradient(to right, #8CECE1, #4DBCE9);
    opacity: 0.9;
    border-radius: 32px;
    padding: 5rem;
    margin-right: 80px;
    margin-left: 80px ;
  }
  input {
    margin-bottom: 50px;
    background-color: #A2F9F1;
    padding: 1rem;
    border: 0.1rem solid #A2F9F1;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      //border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    margin-bottom: 25px;
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    opacity: 1;
    &:hover {
      background-color: #7063B3;
    }
  }
  span {
    margin-bottom: 70px;
    color: white;
    text-align: center;
    text-transform: uppercase;
    font-size: 15px;
    a {
      margin-bottom: 50px;
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
