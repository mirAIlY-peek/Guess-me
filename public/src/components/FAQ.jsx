import React, {useState, useEffect} from "react";
import styled from "styled-components";
// import { mixDB} from "../utils/APIRoutes";
// import axios from "axios";
import {useSearchParams} from "react-router-dom";


export default function FAQ({contacts, changeChat, users}) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [currentUserID, setCurrentUserID] = useState(null);
    const [currentUser, setCurrentUser] = useState(undefined);

    const [searchParams] = useSearchParams();
    const data = searchParams.get("roomCode");
    const [room, setRoom] = useState(data)

    useEffect(async () => {
        setCurrentUser(
            await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )
        );
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
        setCurrentUserID(data._id);
        // console.log(users);
    }, []);


    // const mix = ()=>{
    //     axios.post(mixDB, {lobbyRoomID: users.room})
    // }

    const changeCurrentChat = (index, contact ) => {
        setCurrentSelected(index);
        changeChat(contact);
        console.log(users)
    };

    return (
        <>
            {currentUserImage && currentUserImage && (
                <Container>
                    <div className="brand">
                        {/*<img src={Logo} alt="logo"/>*/}
                        <h2>Anonimus</h2>
                    </div>

                    <div className="contacts">

                        {/*<button className="utton" onClick={() => run(currentUserID.toString())}>Start GAME</button>*/}
                        {/*{contacts.filter((contact, index) => contact._id === currentUser._id ? (*/}
                        {/*    <div*/}
                        {/*        // key={contact._id}*/}
                        {/*        className={`contact ${*/}
                        {/*            index === currentSelected ? "selected" : ""*/}
                        {/*        }`}*/}
                        {/*        onClick={() => changeCurrentChat(index, contact)}*/}
                        {/*    >*/}

                        {/*        <div className="avatar">*/}
                        {/*          <img*/}
                        {/*              src={`data:image/svg+xml;base64,${contact.avatarImage}`}*/}
                        {/*              alt=""*/}
                        {/*          />*/}
                        {/*        </div>*/}
                        {/*        <div className="username">*/}
                        {/*          <h3>{contact.username}</h3>*/}
                        {/*        </div>*/}
                        {/*        /!*      <button className="utton" onClick={() => run(contact._id.toString())}>Start GAME</button>*!/*/}
                        {/*        /!*<button className="utton" onClick={() => run(contact._id.toString())}>Start GAME</button>*!/*/}
                        {/*    </div>*/}
                        {/*) : false )}*/}
                        {/*{contacts.filter((users) =>{*/}

                                <>

                                    <div className="FAQ">
                                        <div className="avatar">
                                            <h2>How to play</h2>
                                        </div>
                                        <div className="username">
                                            <h3><span>1.</span> Invite friends to play</h3>
                                            <br/>
                                            <h3 className="aa"><span>2. </span>  time to guess</h3>
                                            <br/>
                                            <h3 className="aaa"><span>3. </span>  look at the result</h3>
                                        </div>
                                    </div>
                                </>
                    </div>


                </Container>
            )}
        </>
    );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background: linear-gradient(to top, #50BEE9, #8CECE1);
  opacity: 0.8;
  box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border-radius: 2rem 0 0 2rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 2rem;
    }

    h2 {
      color: white;
      text-transform: uppercase;
    }
  }

  .utton {
    width: 100px;
    height: 40px;
    background-color: black;
    color: aliceblue;
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .FAQ {
      margin-top: 20px;
      width: 80%;
      border-radius: 15px;
      height: 100%;
      background-color: rgba(172, 239, 245, 0.33);

      .avatar {
        h2 {
          text-align: center;
        }
      }
      .username {
        margin:40px 0 0 10px;
        h3 {
          span{
            color: white;
            font-weight: bold;
          }
          margin: 10px auto;
          text-align: center;
        }
        .aa{
          margin-left: 33px;
          text-align: left;
        }
        .aaa{
          margin-left: 33px;
          text-align: left;
        }
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      height: 100%;


      .avatar h3 {
        text-align: center;
      }

      .username {
        h3 {
          color: white;
        }
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #5959cb;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
      }
    }


    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
