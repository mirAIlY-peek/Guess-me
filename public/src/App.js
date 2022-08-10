import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/chat/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from './pages/Homepage'
import Game from './pages/Game'
import Error from './components/error'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path='/home' element={< Homepage/>} />
        <Route path='/play' element={< Game/>} />
        <Route path='/play:roomId' element={< Game/>} />
        <Route path="/" element={<Chat />} />
        <Route path="/join/:userId" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

