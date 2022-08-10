const {run, mix, join, joinUser}= require("../controllers/lobbyController")

const router = require("express").Router();

router.post("/addroom", run );
router.get("/mix", mix);
router.all("/join", join);
router.all("/joinUser", joinUser);


module.exports = router;

