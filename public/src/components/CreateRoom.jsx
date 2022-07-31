import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {runDB} from "../utils/APIRoutes";
import axios from "axios";
export default function CreateRoom() {
    const [currentUserID, setCurrentUserID] = useState(null);
    useEffect(async () => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        setCurrentUserID(data._id);
    }, []);

    const run = async (userID) => {
        axios.post(runDB, {firstUser: userID})
        console.log(userID)
    }
    const addAd = async () =>{
        axios.get(`http://api.galam.life:3000/api/v1/region`)
                .then((res)=>{
                    console.log(res)
                })
    }
    return (
        <Container>
            <button className="button" onClick={() => run(currentUserID.toString())  }>Start GAME</button>
            <button className="button" onClick={ ()=> addAd()}>Start GAME</button>
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
  .button{
    width: 100px;
    height: 40px;
    background-color: black;
    color: aliceblue;
  }
  span {
    color: #4e0eff;
  }
`;
