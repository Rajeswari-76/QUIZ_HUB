const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  saveScore,
  getLeaderboard
} = require("../controllers/scoreController");

router.post("/", auth, saveScore);
router.get("/", getLeaderboard);

module.exports = router;