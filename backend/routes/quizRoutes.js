const express = require("express");
const { generateQuiz, getTopics, getQuiz } = require("../controllers/quizController");

const router = express.Router();

router.post("/generate", generateQuiz);
router.get("/topics", getTopics);
router.get("/:topic", getQuiz);

module.exports = router;