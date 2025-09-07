import Navbar from "../components/Navbar";
import React, { useEffect, useState } from 'react'
import "./Home.css"
const Home = () => {

     const [stats, setStats] = useState([]);
    const [selectedGamer, setSelectedGamer] = useState(null);

    return (
        <div>
            <Navbar />
            <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero__content">
          <h1>Welcome back, Player!</h1>
          <p>Jump in, climb the leaderboard, and unlock new achievements.</p>
          <div className="hero__actions">
            <a className="btn" href="/library">Play Now</a>
            <a className="btn btn--ghost" href="/leaderboard">Full Leaderboard</a>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="quick">
        <a className="card" href="/profile">
          <h3>🎨 Profile</h3>
          <p>Customize avatar, bio, and theme.</p>
        </a>
        <a className="card" href="/achievements">
          <h3>🏆 Achievements</h3>
          <p>Track badges and milestones.</p>
        </a>
        <a className="card" href="/settings/password">
          <h3>🔒 Security</h3>
          <p>Change password & 2FA.</p>
        </a>
      </section>

      {/* MAIN GRID */}
      <section className="grid">
        {/* Leaderboard preview */}
        <div className="panel">
          <div className="panel__header">
            <h2>Leaderboard (Top 10)</h2>
            <a href="/leaderboard" className="link">See all →</a>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {stats.length === 0 ? (
                <tr><td colSpan={5} className="empty">No players yet — be the first!</td></tr>
              ) : (
                stats
                  .slice() // avoid mutating original
                  .sort((a,b) => b.wins - a.wins)
                  .slice(0, 10)
                  .map((s, i) => (
                    <tr key={s.username} onClick={() => setSelectedGamer(s)} className="row">
                      <td>{i + 1}</td>
                      <td>{s.username}</td>
                      <td>{s.wins}</td>
                      <td>{s.losses}</td>
                      <td><span className="tag">{s.rank}</span></td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        {/* Selected gamer / tips */}
        <div className="panel">
          <div className="panel__header">
            <h2>{selectedGamer ? "Gamer Details" : "Tips"}</h2>
          </div>

          {selectedGamer ? (
            <div className="gamer">
              <div className="gamer__avatar">{selectedGamer.username[0]?.toUpperCase()}</div>
              <div className="gamer__meta">
                <h3>{selectedGamer.username}</h3>
                <p>Rank: <b>{selectedGamer.rank}</b></p>
                <p>Record: <b>{selectedGamer.wins}</b> W • <b>{selectedGamer.losses}</b> L</p>
              </div>
              <button className="btn btn--small" onClick={() => setSelectedGamer(null)}>Clear</button>
            </div>
          ) : (
            <ul className="tips">
              <li>Play daily to earn streak bonuses.</li>
              <li>Win matches to boost your leaderboard spot.</li>
              <li>Customize your profile to stand out.</li>
            </ul>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span>© {new Date().getFullYear()} Irvin’s Games</span>
        <span>•</span>
        <a href="/contact" className="link">Contact</a>
      </footer>
    </div>

        </div>
    )
}

export default Home; 