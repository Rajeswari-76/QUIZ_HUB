const { generateQuestions } = require("../utils/aiGenerator");

exports.getQuiz = async (req, res) => {
  try {
    const { topic } = req.query;

    const questions = await generateQuestions(topic);

    res.json(questions);
  } catch (err) {
    res.status(500).json("Error generating quiz");
  }
};