const {run, mix}= require("../controllers/lobbyController")

const router = require("express").Router();

router.post("/addroom", run );
router.get("/mix", mix);


module.exports = router;
