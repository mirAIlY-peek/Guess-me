import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { runDB} from "../utils/APIRoutes";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import './btn.css'



export default function CreateRoom({users}) {
    const [currentUserID, setCurrentUserID] = useState(null);

    const navigate = useNavigate();
    // const [roomCode, setRoomCode] = useState(randomCodeGenerator(7))
    // const [searchParams] = useSearchParams();
    // const data = searchParams.get("roomCode");
    // const [room, setRoom] = useState(data)
    // const [run , setRun] = useState()

    // const { username, room } = qs.parse(location)
    useEffect(async () => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        setCurrentUserID(data._id);
        // socket.emit('join', {room: room, data: data}
    }, []);

    const runFunction = () => {

        const roomCode =  randomCodeGenerator(7)

        // const res = await axios.get(runDB);
        //
       axios.post(runDB, {firstUser: currentUserID.toString(), roomID:roomCode })
        navigate(`/play?roomCode=${roomCode}`)

        // console.log(users);
        console.log({firstUser: currentUserID.toString()})
        //   axios.post(runDB, {roomms: room})
    }

    // useEffect(async ()=> {
    //     if(room && currentUserID){
    //         runFunction()
    //     }
    // }, [room,currentUserID])


    // const addAd = async () =>{
    //     axios.get(`http://api.galam.life:3000/api/v1/region`)
    //             .then((res)=>{
    //                 console.log(res)
    //             })
    // }


    // console.log(roomCode,currentUserID)
    if( !currentUserID) return <>No room or currUser</>

    return (
        <Container>
            <>

                {/*<div className='homepage-create'>*/}
                {/*    <Link to={`/play?roomCode=${randomCodeGenerator(7)}`} style = {{textDecoration: 'none'}}><button variant="contained" className="game-button orange" style = {{width: "200px", backgroundColor: "#00368E", color: "white"}}>CREATE GAME</button>*/}
                {/*</div>*/}

                    <input placeholder='Game Code'/>
                         <button className="buttons">Start</button>

                <button  className="buttons" onClick={runFunction}>
           create
                </button>

                {/*<button className="button" onClick={() => mix()}>Join</button>*/}
            </>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  .buttons{
    width: 100px;
    height: 40px;
    //background-color: black;
    border-color: #8CECE1;
    background: #8CECE1;
    color: aliceblue;
    border-radius: 15px;
  }
  span {
    color: #4e0eff;
  }
`;
