const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const generateAccessToken = (password) => {
  const payload = {
    user: password,
  }
  return jwt.sign(payload, 'Hello', {expiresIn: "1h"})
}


module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;

    const token = generateAccessToken(req.body.password);
    return res.json({ status: true, user, token });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password} = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = generateAccessToken(req.body.password);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      token,
    });
    delete user.password;

    return res.json({ status: true, user, token });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
      "token"
    ]);

  console.log(users)
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    // const token = generateAccessToken(req.body.username);
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
      // token
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

const users = []

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  if (!username || !room) {
    return {
      error: 'Username and room are required!'
    }
  }    const existingUser = users.find((user) => {
    return user.room === room && user.username === username
  })

  if (existingUser) {
    return {
      error: 'Username is in use!'
    }
  }

  const user = { id, username, room }
  users.push(user)
  return { user }
}

// const users = []
// const addUser = ({ id, username, room }) => {
//   username = username.trim().toLowerCase()
//   room = room.trim().toLowerCase()
//
//   if (!username || !room) {
//     return {
//       error: 'Username and room are required!'
//     }
//   }    const existingUser = users.find((user) => {
//     return user.room === room && user.username === username
//   })
//
//   if (existingUser) {
//     return {
//       error: 'Username is in use!'
//     }
//   }
//
//   const user = { id, username, room }
//   users.push(user)
//   return { user }
// }
//
// const removeUser = (id) => {
//   const index = users.findIndex((user) => user.id === id)
//
//   if (index !== -1) {
//     return users.splice(index, 1)[0]
//   }
// }
//
// const getUser = (id) => {
//   return users.find((user) => user.id === id)
// }
//
// const getUsersInRoom = (room) => {
//   room = room.trim().toLowerCase()
//   return users.filter((user) => user.room === room)
// }
//
module.exports = {
  addUser,
}
