const router = require("express").Router();
const { getQuiz } = require("../controllers/quizController");

router.get("/", getQuiz);

module.exports = router;