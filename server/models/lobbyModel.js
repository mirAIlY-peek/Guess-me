const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
    lobbyNumber: {
        type: String,
        required: false
    },
    lobbyRoomID: {
         type: String,
    },
    finished: {
            type: Boolean,
    },
    users: [
        {
            userID: {
            type: String
            }
        }
    ]
    // idUser1: {
    //     type: [
    //         {
    //             type: mongoose.Schema.ObjectId,
    //             ref: "User",
    //         },
    //     ],
    // },
    // idUser2: {
    //     type: [
    //         {
    //             type: mongoose.Schema.ObjectId,
    //             ref: "User",
    //         },
    //     ],
    // },
    // idUser3: {
    //     type: [
    //         {
    //             type: mongoose.Schema.ObjectId,
    //             ref: "User",
    //             required: false,
    //         },
    //     ],
    // },
});

module.exports = mongoose.model("Lobby", roomSchema);
