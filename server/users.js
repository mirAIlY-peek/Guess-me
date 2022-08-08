const User = require("./models/userModel");
const express = require("express");
const users = []
const num = new Map([ ])


const addUser = ({id, name, room, points, ready, avatarImage}) => {

    User.find({username: name})

    const numberOfUsersInRoom = users.filter(user => user.room === room).length
    if(numberOfUsersInRoom === 8)
        return { error: 'Room full' }
    let data = users.map(({id}) => id);
    console.log(data)
    if(data.indexOf(id) !== -1){
        return { error: 'User already exists' }
    }
    else {
        const newUser = {id, name, room, points, ready, avatarImage}
        users.push(newUser)
        console.log(newUser)
        // console.log(setCurrentUserID, 'ieajfoi')
        return {newUser}
    }
}

const removeUser = ({id, room}) => {
    if(getUsersInRoom(room).length == 1){
        num.set(room, 1);
    }
    const removeIndex = users.findIndex(user => user.id === id);
    let lol
    if(removeIndex !== -1){
        lol =users.splice(removeIndex, 1)[0]
    }
    console.log(lol)
    if(removeIndex!==-1)
        return lol
}

const getUser = id => {
    console.log(users)
    return users.find(user => user.id === id)
}

const getUsersInRoom = room => {
    num.set(room, num.get(room) ? num.get(room) : 1);

    return users.filter(user => user.room === room)
}
const ReadyAll = room => {
    const users = getUsersInRoom(room)
    for(let i = 0; i < users.length; i++){
        users[i].ready = false
    }
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom, ReadyAll }
