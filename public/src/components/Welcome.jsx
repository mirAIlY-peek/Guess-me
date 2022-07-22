import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>Stranger</span>
      </h1>
      <h3>Please select a chat to start the game.</h3>


         {/*<form action="">*/}
         {/*      <label>Display name</label>*/}
         {/*      <input type="text" name="username" autoComplete="off" placeholder="Display name" required></input>*/}
         {/*      <label>Room</label>*/}
         {/*      <input type="text" name="room" autoComplete="off" placeholder="Room" required></input>*/}
         {/*      <button>Join</button>*/}
         {/*</form>*/}

    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
