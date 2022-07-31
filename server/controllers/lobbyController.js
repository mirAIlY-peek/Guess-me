const Room = require("../models/lobbyModel");



module.exports.run = async (req) => {

    const {firstUser} = req.body;

    try {
        const rooms = await Room.find();
        let idUsers2 = undefined
        const room = new Room({
            lobbyNumber: rooms.length + 1,
            idUser1: firstUser,
            idUser2: idUsers2
        })

        console.log(firstUser);

        room.save()

    }
    catch (e) {
        console.log(e)
    }

}

module.exports.mix = async() => {

}

