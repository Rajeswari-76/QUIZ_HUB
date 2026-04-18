import React from "react";
import LeaderboardComponent from "../components/Leaderboard";
import Navbar from "../components/Navbar";

export default function Leaderboard() {
  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingTop: '4rem', maxWidth: '800px', margin: '0 auto' }}>
        <LeaderboardComponent />
      </div>
    </div>
  );
}