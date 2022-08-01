import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {host, runDB} from "../utils/APIRoutes";
// const socket = io()
// import {mixDB} from "../utils/APIRoutes";
import axios from "axios";
// import { io } from "socket.io-client";
// const socket = useRef();

export default function CreateRoom(props) {
    const [currentUserID, setCurrentUserID] = useState(null);

    // const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

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

    // socket.emit('join', { username, room }, (error) => {
    //     if (error) {
    //         alert(error)
    //         location.href = '/'
    //     }
    // })

    const mix = async ()  =>{
        // console.log('ednogngo')
        // axios.get(mixDB)
        //     .then((data)=>{
        //         console.log('ednogngo')
        //         console.log(data)
        // socket.current = io(host);
        // socket.current.emit("mix", currentUser._id);
    }
    // const addAd = async () =>{
    //     axios.get(`http://api.galam.life:3000/api/v1/region`)
    //             .then((res)=>{
    //                 console.log(res)
    //             })
    // }

    return (
        <Container>
            <button className="button" onClick={() => run(currentUserID.toString(), props.setFlag(e=>!e))}>Start GAME</button>
            {/*<button className="button" onClick={() => mix()}>mix</button>*/}
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
