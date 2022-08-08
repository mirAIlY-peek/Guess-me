const Lobby = require("../models/lobbyModel");
const socket = require("socket.io");
const User = require("../models/userModel");


// const { addUser} = require('../users')

module.exports.run = async (req, payload) => {
    const{roomID} = req.body;
    const {firstUser} = req.body;
    // const min = addUser({
    //     room: payload.room
    // })

    // const {lobbieID} = req.body;
    try {
        const rooms = await Lobby.find();
        let idUsers2 = undefined

        const room = new Lobby({
                lobbyNumber: rooms.length + 1,
                lobbyRoomID: roomID,
                finished: false,
                idUser1: firstUser,
                idUser2: idUsers2
            }
        )
        // if(Lobby[3].idUser1===firstUser){
        //
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


    } catch (e) {
        console.log(e)
    }
}

