import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { runDB} from "../utils/APIRoutes";
import { mixDB} from "../utils/APIRoutes";
import { joinDB} from "../utils/APIRoutes";
import { joinUserDB} from "../utils/APIRoutes";
import axios from "axios";
import Error from "../components/error"

import {Link, useNavigate,useParams } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import './btn.css'



export default function CreateRoom({users}) {
    const [currentUserID, setCurrentUserID] = useState(null);
    const navigate = useNavigate();
    const [joinRoom , setJoinRoom] = useState(null)

    // const [roomCode, setRoomCode] = useState(randomCodeGenerator(7))
    // const [searchParams] = useSeasrchParams();
    // const data = searchParams.get("roomCode");
    // const [room, setRoom] = useState(data)
    // const [run , setRun] = useState()
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

    let { userId } = useParams();


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

        console.log({Width: windowSize.innerWidth})
        console.log({height: windowSize.innerHeight})

        // const res = await axios.get(runDB);
        //
       axios.post(runDB, {firstUser: currentUserID.toString(), roomID:roomCode})
        navigate(`/play?roomCode=${roomCode}`)

        // console.log(users);
        console.log({firstUser: currentUserID.toString()})
        //   axios.post(runDB, {roomms: room})
    }


    const checkRoom = () => {
        // console.log(joinRoom)
        // axios.post(joinDB, {roomCreate: joinRoom})
        axios.get(joinDB,{params:{joinRoom}})
            .then((res)=>{
                if(res.data && res.data.length > 0) {
                    axios.post(joinUserDB,{params:joinRoom },{ firstUser: currentUserID.toString()})
                    navigate(`/play?roomCode=${joinRoom}`)
                }
                console.log(res.data);
            })
            .catch((err )=>{
                console.log(err)
                }
            )


    }


    // useEffect(async ()=> {
    //     if(room && currentUserID){
    //         runFunction()
    //     }
    // }, [room,currentUserID])


    // const roomCode =  randomCodeGenerator(7)
    //
    // console.log({Width: windowSize.innerWidth})
    // console.log({height: windowSize.innerHeight})
    //
    // // const res = await axios.get(runDB);
    // //
    // axios.post(runDB, {firstUser: currentUserID.toString(), roomID:roomCode })
    // navigate(`/play?roomCode=${roomCode}`)
    //
    // // console.log(users);
    // console.log({firstUser: currentUserID.toString()})
    //   axios.post(runDB, {roomms: room})

    const addAd = () =>{
            axios.get(mixDB)
                .then((res)=>{
                    console.log(res.data);
                })
            .catch((err )=>{
                console.log(err)
            })
    }


    // console.log(roomCode,currentUserID)
    if( !currentUserID) return <>No room or currUser</>
    // if(windowSize.innerWidth === 414) return <><Error/></>

    return (
        <Container>
            <>
                    <input placeholder='Game Code' onChange={(e) => setJoinRoom(e.target.value)}/>
                    <button className="buttons" onClick={checkRoom} ><h1>START</h1></button>


                <button  className="buttons" onClick={runFunction}>
                    <h1>CREATE GAME</h1>
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
    margin: 20px auto;
    width: 280px;
    height: 50px;
    //background-color: black;
    border-color: #8CECE1;
    background: #8CECE1;
    color: aliceblue;
    border-radius: 5px;
  }
  span {
    color: #4e0eff;
  }
`;
