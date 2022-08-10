import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import rotate from "../assets/animation-500-l6l9tv60-unscreen.gif"


import {useParams } from "react-router-dom";

export default function Chat() {


    let { userId } = useParams();

    let miras = ()=>{
        console.log(userId)
    }


    return (
        <>
            <Container>
                <img src={rotate}  alt="" />
                <h1>
                    <span onClick={miras}>Rotate devices please</span>
                </h1>

            </Container>
        </>
    );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  color: #00FFFF;
  flex-direction: column;
  background-color: black;
  justify-content: center;
  gap: 1rem;
  align-items: center;


  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    box-shadow: rgba(0, 0, 0, 0.5) 0 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  img {
    height: 15rem;
  }
  span {
    color: #00FFFF;
  }
`;
