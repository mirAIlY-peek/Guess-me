const Lobby = require("../models/lobbyModel");
const socket = require("socket.io");
const User = require("../models/userModel");


// const { addUser} = require('../users')

module.exports.run = async (req) => {
    const{roomID} = req.body;
    const {firstUser} = req.body;
    // const min = addUser({
    //     room: payload.room
    // })

    // const {lobbieID} = req.body;
    try {

        // console.log(roomId)
        const rooms = await Lobby.find();
        let idUsers2 = undefined

        const room = new Lobby({
                lobbyNumber: rooms.length + 1,
                lobbyRoomID: roomID,
                finished: false,
                users: [{userID: firstUser}]
            }
        )
        // if(Lobby[3].idUser1===firstUser){
        // }
        // console.log(firstUser);
        room.save()
    } catch (e) {
        console.log(e)
    }

}

module.exports.mix = async (req, res) => {
    try {
        const room = await Lobby.find();
        res.send(room);

    } catch (e) {
        console.log(e)
    }
}

module.exports.join = async (req, res) => {
    // const {roomCreate} = req.body
    const {firstUser} = req.body;
    const lobbyRoomID = req.query.joinRoom
    try {
        // const roomIDS = {roomid: roomCreate}
        console.log(lobbyRoomID)
        const rooms = await Lobby.find({"lobbyRoomID": lobbyRoomID});
        res.send(rooms);

        rooms.updateOne({users: Array}, {$push: {userID: firstUser}})

        console.log(rooms)

    } catch (e) {
        console.log(e)
    }
}


module.exports.joinUser = async (req, res) => {
    const lobbyRoomID = req.query.joinRoom
    const {firstUser} = req.body;
    try {
        const rooms = await Lobby.find({"lobbyRoomID": lobbyRoomID});
        res.send(rooms);
        console.log(rooms)

        await Lobby.findOneAndUpdate({
            lobbyNumber:"17"
        }, {
            $push: {
                users: [{userID: firstUser}]
            }
        })

    } catch (e) {
        console.log(e)
    }
}

