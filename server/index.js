const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const roomRoutes = require("./routes/lobby");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

const { addUser, removeUser, getUser, getUsersInRoom, ReadyAll } = require('./users')
// const { addUser, removeUser, getUser, getUsersInRoom } = require('./controllers/userController')

const path = require("path");
app.use(cors());
app.use(express.json());

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

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




    socket.on('join', (payload, callback) => {
        let numberOfUsersInRoom = getUsersInRoom(payload.room)
        console.log(socket.id)
        const { error, newUser} = addUser({
            id: socket.id,
            name: 1,
            room: payload.room,
            points: 0,
            ready: false
        })
        // console.log(newUser.name.charAt(7))

        if(error){
            return callback(error)

        }
        socket.join(newUser.room)

        io.to(newUser.room).emit('roomData', {room: newUser.room, users: getUsersInRoom(newUser.room)})
        socket.emit('currentUserData', {name: newUser.name})
        callback()
    })

    socket.on('initGameState', gameState => {
        const user = getUser(socket.id)
        if(user)
            io.to(user.room).emit('initGameState', gameState)
    })

    socket.on('updateGameState', gameState => {
        isstarted = gameState.gamestarted;
        console.log(gameState)
        const user = getUser(socket.id)
        if(user)
            io.to(user.room).emit('updateGameState', gameState)
    })

    // socket.on('sendMessage', (payload, callback) => {
    //     const user = getUser(socket.id)
    //     io.to(user.room).emit('message', {user: user.name, text: payload.message})
    //     callback()
    // })

    // socket.on('disconnect', () => {
    //     const user = getUser(socket.id)
    //     removeUser({id: socket.id, room: user.room});
    //
    //     if(getUsersInRoom(user.room).length > 0){
    //         io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    //
    //     }
    // })

    // socket.on('setUsername', (username1) => {
    //     const user = getUser(socket.id)
    //     user.username = username1
    //     user.points = user.points
    //     io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    //
    // })
    // socket.on('setPoints', (id) => {
    //     const user = getUser(id)
    //     user.points = user.points + 1
    //     io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    //
    // })
    socket.on('Ready', () => {
        const user = getUser(socket.id)
        if(user.ready === false) user.ready = true
        else user.ready = false
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    })
    socket.on('AllReady', gameState => {
        const user = getUser(socket.id)
        user.ready = false
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    })









    //
    // socket.on('join', (payload, callback) => {
    //     let numberOfUsersInRoom = getUsersInRoom(payload.room).length
    //
    //     const { error, newUser} = addUser({
    //         id: socket.id,
    //         name: numberOfUsersInRoom===0 ? 'Player 1' : 'Player 2',
    //         room: payload.room
    //     })
    //
    //     if(error)
    //         return callback(error)
    //
    //     socket.join(newUser.room)
    //
    //     io.to(newUser.room).emit('roomData', {room: newUser.room, users: getUsersInRoom(newUser.room)})
    //     socket.emit('currentUserData', {name: newUser.name})
    //     callback()
    // })
    //
    // socket.on('initGameState', gameState => {
    //     const user = getUser(socket.id)
    //     if(user)
    //         io.to(user.room).emit('initGameState', gameState)
    // })
    //
    // socket.on('updateGameState', gameState => {
    //     const user = getUser(socket.id)
    //     if(user)
    //         io.to(user.room).emit('updateGameState', gameState)
    // })
    //
    // socket.on('sendMessage', (payload, callback) => {
    //     const user = getUser(socket.id)
    //     io.to(user.room).emit('message', {user: user.name, text: payload.message})
    //     callback()
    // })
    //
    // socket.on('disconnect', () => {
    //     const user = removeUser(socket.id)
    //     if(user)
    //         io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    // })
    //







    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});

// io.on("mix", (data) => {
//     console.log(data)
// })


// io.on('connection', (socket) => {
//     console.log('New WebSocket connection')
//
//     socket.on('join', (options, callback) => {
//         const {error, user} = addUser({id: socket.id, ...options})
//
//         if (error) {
//             return callback(error)
//         }
//
//         socket.join(user.room)
//
//         callback()
//     })
// })

