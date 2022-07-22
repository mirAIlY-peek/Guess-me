const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const User = require("./models/userModel.js");
const Room = require('./models/Room.js')
// const path = require('path')
// const http = require('http')
//
// const { addUser, removeUser, getUser, getUserInRoom } = require('../../Anonim/public/src/utils/users')



app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});


let clientNo = 0;
let No;

run()
async function run() {
  const rooms = new Room({roomName: "1"})
  await rooms.save()
  console.log(rooms)
}
//
// io.on("connection", connected, socket => {
//   socket.join("some room");
// });
// setInterval(serverLoop, 1000/60);
//
//
// let clientNo = 0;
// let roomNo;
//
// function connected(socket){
//   clientNo++;
//   roomNo = Math.round(clientNo/2);
//   socket.join(roomNo)
//   console.log(`New users chats: ${clientNo}, room no.:${roomNo}`)
// }
//
//
//
//
// function serverLoop(){
//   for (let room = 1; room <= roomNo; room++){
//     if ([room] === undefined){
//       console.log("waiting for 2 players...");
//     } else {
//       io.to(room).emit('updateFootball')
//     }
//   }
// }
