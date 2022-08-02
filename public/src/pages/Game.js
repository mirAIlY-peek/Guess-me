import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSearchParams } from 'react-router-dom';

import './app.css'


let socket
const ENDPOINT = 'http://localhost:5000'

const Game = (props) => {
    // PACK_OF_CARDS();
    const [username, setUsername] = useState('')

    const [searchParams] = useSearchParams();
    // console.log(searchParams.get("play   ")); // ▶ URLSearchParams {}
    const data = searchParams.get("roomCode");
    const [room, setRoom] = useState(data)
    const [roomFull, setRoomFull] = useState(false)
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState('')
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

        socket.emit('join', {room: room}, (error) => {
            if(error)
                setRoomFull(true)
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
    useEffect(() => {

        socket.on("roomData", ({ users }) => {
            setUsers(users)
        })

        socket.on('currentUserData', ({ name }) => {
            // console.log(name)
            setCurrentUser(name)
        })
    }, [])
    //123
    useEffect(() => {

        if(gamestarted === true && ok === true){

            let username1 = username;
            if(username1 === ""){

                username1 = 'Player ' + currentUser
                setUsername(username1)
            }
            socket.emit('setUsername', (username1))
        }

    }, [gamestarted])
    if(gamestarted !== true){
        for(let i = 0; i < users.length; i++){
            users[i].username = "Player " + users[i].name
        }
    }
    return (
        <div>
            {users.length > 0 && gamestarted === false && currentUser !== users[0].name && (
                <div className='homepage-name'>
                    <div className='Start-name'>
                        <h1 style={{fontSize: "50px"}}> <span className="TextGreen">WHAT DO</span>  <span className="TextPurple">YOU</span> </h1>
                        <h1 style={{fontSize: "60px"}}><span className='TextPink'>MEME</span><span className='TextPurple'>?</span></h1>
                        <p type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)} /><p /> Wait host...
                    </div>

                    <div className='Start-Status'>
                        <div>{users.map((item, i) => (
                            <span key ={i}>{`${item.username} ${item.name === currentUser ? " This is you" : ""}`}</span>

                        ))}
                        </div>
                    </div>
                </div>
            )}
            {users.length > 0 && currentUser === users[0].name  && gamestarted === false && <>
                <div className='homepage-name'>
                    <div className='Start-name'>
                        <h1 style={{fontSize: "50px"}}> <span className="TextGreen">WHAT DO</span>  <span className="TextPurple">YOU</span> </h1>
                        <h1 style={{fontSize: "60px"}}><span className='TextPink'>MEME</span><span className='TextPurple'>?</span></h1>

                        <p type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)} />
                        <p></p>
                        <button variant='outlined' style = {{width: "200px", backgroundColor: "#00368E", color: "white"}} >
                            startgame
                        </button>
                    </div>
                    <div className='Start-Status'>
                        <p>{users.map((item, i) => (
                            <span key ={i}>{`${item.username} ${item.name === currentUser ? " This is you" : ""}`}</span>

                        ))}
                        </p>
                    </div>
                </div>
            </>}

        </div>
    )
}

export default Game
