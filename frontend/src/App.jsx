import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import QuizSession from "./pages/QuizSession";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/quiz" element={<QuizSession />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;