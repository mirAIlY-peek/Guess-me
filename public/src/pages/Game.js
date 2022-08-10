import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSearchParams, useNavigate } from 'react-router-dom';
import './app.css'
import axios from "axios";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import CreateRoom from "../components/CreateRoom";
import Error from "../components/error";


let socket
const ENDPOINT = 'http://localhost:5000'


const Game = (props) => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    const [isShowContacts, setIsShowContacts] = useState(false)
    const [flag, setFlag] = useState(false);

    useEffect(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/login");
        } else {
            setCurrentUser(
                await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                )
            );
        }
    }, []);
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);




    useEffect(async () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/login");
        } else {
            setCurrentUser(
                await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                )
            );
        }
    }, []);
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(async () => {
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                setContacts(data.data);
            } else {
                navigate("/setAvatar");
            }
        }
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };









    // PACK_OF_CARDS();
    const [username, setUsername] = useState('')

    const [searchParams] = useSearchParams();
    // console.log(searchParams.get("play   ")); // ▶ URLSearchParams {}
    const data = searchParams.get("roomCode");
    const [room, setRoom] = useState(data)
    const [roomFull, setRoomFull] = useState(false)
    const [users, setUsers] = useState([])
    const [currentUsers, setCurrentUsers] = useState('')
    const [gamestarted, setGameStarted] = useState(false);

    let cnt = 0;

    useEffect(() => {
        const connectionOptions =  {
            "forceNew" : true,
            "reconnectionAttempts": "Infinity",
            "timeout" : 10000,
            "transports" : ["websocket"]
        }
        socket = io.connect(ENDPOINT, connectionOptions)

        const data = JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        if(data == null) {
            return navigate("/");
        }

        socket.emit('join', {room: room, data: data}, (error) => {
            console.error(error)
            if(error) {
                return navigate("/");

                // setRoomFull(true)
                // // if(error === 'User already exists'){
                // //     return (<Navigate to="/" />
                // //     );
                // }
            }
        })
        //cleanup on component unmount
        return function cleanup() {
            socket.disconnect();
            //shut down connnection instance
            socket.off()
        }
    }, []);

    const [ok, setOk] = useState(true);
    // setOk(false)
    useEffect(async () => {
       await socket.on("roomData", ({ users }) => {
            setUsers(users)
        })
       await socket.on('currentUserData', ({ name }) => {
            // console.log(name)
            setCurrentUsers(name)
        })
    }, [])
    //123


    const mix = ()=>{
        // console.log(users)
    }

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
        <div>

                <Container>
                    <div className="container">
                        <Contacts users={users} contacts={contacts} flag={flag} changeChat={handleChatChange} />
                        {currentChat === undefined ? (<CreateRoom users={users} setFlag={setFlag} setIsShowContacts={setIsShowContacts} />) : (<ChatContainer currentChat={currentChat} socket={socket} />)}
                    </div>
                </Container>

            {/*{users.length > 0 && gamestarted === false && currentUser !== users[0].name && (*/}
            {/*    <div className='homepage-name'>*/}
            {/*        <div className='Start-name'>*/}
            {/*            <h1 style={{fontSize: "50px"}}> <span className="TextGreen">WHAT DO</span>  <span className="TextPurple">YOU</span> </h1>*/}
            {/*            <h1 style={{fontSize: "60px"}}><span className='TextPink'>MEME</span><span className='TextPurple'>?</span></h1>*/}
            {/*            <p type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)} /><p /> Wait host...*/}
            {/*        </div>*/}

            {/*        <div className='Start-Status'>*/}
            {/*            <div>{users.map((item, i) => (*/}
            {/*                <span key ={i}>{`${item.username} ${item.name === currentUser ? " This is you" : ""}`}</span>*/}

            {/*            ))}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{users.length > 0 && currentUsers === users[0].name  && gamestarted === false && <>*/}
            {/*    <div className='homepage-name'>*/}
            {/*        <div className='Start-name'>*/}
            {/*            <h1 style={{fontSize: "50px"}}> <span className="TextGreen">WHAT DO</span>  <span className="TextPurple">YOU</span> </h1>*/}
            {/*            <h1 style={{fontSize: "60px"}}><span className='TextPink'>MEME</span><span className='TextPurple'>?</span></h1>*/}

            {/*            <p type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)} />*/}
            {/*            <p></p>*/}
            {/*            <button variant='outlined' onClick={()=> mix()} style = {{width: "200px", backgroundColor: "#00368E", color: "white"}} >*/}
            {/*                startgame*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        <div className='Start-Status'>*/}
            {/*            <p>{users.map((item, i) => (*/}
            {/*                <span key ={i}>{`${item.username} ${item.name === currentUsers ? " This is you" : ""}`}</span>*/}
            {/*            ))}*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</>}*/}
        </div>
    )
}
//
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
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
`;


export default Game
