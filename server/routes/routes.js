const { Router } = require("express");
const Controller = require("../controllers/controller");

const router = Router();

router.get("/leaderboards", Controller.getLeaderboards);
router.get("/puzzle/random", Controller.getRandomPuzzle);
router.post("/player", Controller.getPlayer);
router.post("/stockfish", Controller.getStockfishAnalysis);
router.post("/chat", Controller.chat);

module.exports = router;
