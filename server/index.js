const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const roomRoutes = require("./routes/lobby");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const { addUser} = require('./controllers/userController')

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
app.use("/api/lobby", roomRoutes);



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

  console.log('New WebSocket connection')

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (error) {
      return callback(error)
    }

    socket.join(user.room)
  // io.on('connection', (socket) => {
  //   console.log('New WebSocket connection')
  //
  //   socket.on('join', (options, callback) => {
  //     const { error, user } = addUser({ id: socket.id, ...options })
  //
  //     if (error) {
  //       return callback(error)
  //     }
  //
  //     socket.join(user.room)
  //
  //     socket.emit('message', generateMessage('Admin', 'Welcome!'))
  //     socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
  //     io.to(user.room).emit('roomData', {
  //       room: user.room,
  //       users: getUsersInRoom(user.room)
  //     })
  //
  //     callback()
     })



    socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

io.on("mix",  (data)=>{
  console.log(data)
})

