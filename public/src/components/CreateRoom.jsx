import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { runDB} from "../utils/APIRoutes";
import axios from "axios";
import {Link} from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";


export default function CreateRoom(props) {
    const [currentUserID, setCurrentUserID] = useState(null);

    // const { username, room } = qs.parse(location)

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

    const mix = async ()  =>{


        // console.log(addRooms)
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
            <>

                {/*<div className='homepage-create'>*/}
                {/*    <Link to={`/play?roomCode=${randomCodeGenerator(7)}`} style = {{textDecoration: 'none'}}><button variant="contained" className="game-button orange" style = {{width: "200px", backgroundColor: "#00368E", color: "white"}}>CREATE GAME</button>*/}
                {/*</div>*/}

                <Link to={`/play?roomCode=${randomCodeGenerator(7)}`} style = {{textDecoration: 'none'}}><button className="button" onClick={() => run(currentUserID.toString(), props.setFlag(e=>!e))}>Start GAME</button></Link>
                {/*<button className="button" onClick={() => mix()}>Join</button>*/}
            </>
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
