import { useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const location = useLocation();
  const topic = new URLSearchParams(location.search).get("topic");

  const loadQuiz = async () => {
    const res = await API.get(`/quiz?topic=${topic}`);
    setQuestions(res.data);
  };

  return (
    <div className="quiz-container">
      <h1>{topic} Quiz</h1>

      <button onClick={loadQuiz}>Start Quiz</button>

      <h2>Score: {score}</h2>

      {questions.map((q, i) => (
        <div key={i}>
          <h3>{q.question}</h3>

          {q.options.map((opt, idx) => (
            <button key={idx} onClick={() => {
              if (opt === q.answer) setScore(score + 1);
            }}>
              {opt}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}