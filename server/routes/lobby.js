const {run}= require("../controllers/lobbyController")

const router = require("express").Router();

router.post("/addroom", run );

module.exports = router;
