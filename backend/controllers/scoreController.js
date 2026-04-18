const Score = require("../models/Score");

exports.saveScore = async (req, res) => {
  try {
    const { score } = req.body;

    const newScore = await Score.create({
      user: req.user.id,
      score
    });

    res.json(newScore);
  } catch {
    res.status(500).json("Error saving score");
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const scores = await Score.find()
      .populate("user", "name")
      .sort({ score: -1 })
      .limit(10);

    res.json(scores);
  } catch {
    res.status(500).json("Error fetching leaderboard");
  }
};