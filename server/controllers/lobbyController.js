const Lobby = require("../models/lobbyModel");
const socket = require("socket.io");

module.exports.run = async (req) => {
    const {firstUser} = req.body;
    try {
        const rooms = await Lobby.find();
        let idUsers2 = undefined
        const room = new Lobby({
                lobbyNumber: rooms.length + 1,
                idUser1: firstUser,
                idUser2: idUsers2
            }
        )
        console.log(firstUser);

        room.save()

    } catch (e) {
        console.log(e)
    }

}

module.exports.mix = async () => {
    try {
        const sockets = Array.from(socket).map(socket => socket[0]);
        console.log(sockets, 'adnognogn')
        return sockets
    } catch (e) {
        console.log(e)
    }
}

