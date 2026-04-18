const Score = require("../models/Score");

exports.saveScore = async (req, res) => {
  try {
    const { score, topic, totalQuestions } = req.body;

    const newScore = await Score.create({
      user: req.user.id,
      score,
      topic,
      totalQuestions
    });

    res.json(newScore);
  } catch (err) {
    res.status(500).json("Error saving score: " + err.message);
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const { topic } = req.query;
    const filter = topic ? { topic } : {};

    const scores = await Score.find(filter)
      .populate("user", "name")
      .sort({ score: -1 })
      .limit(10);

    res.json(scores);
  } catch {
    res.status(500).json("Error fetching leaderboard");
  }
};