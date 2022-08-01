const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
    lobbyNumber: {
        type: String,
        required: false,
    },
    idUser1: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
        ],
    },
    idUser2: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
        ],
    },
});

module.exports = mongoose.model("Lobby", roomSchema);
