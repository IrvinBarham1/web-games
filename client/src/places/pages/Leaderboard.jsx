import Navbar from "../components/Navbar";
import React, { useEffect, useState } from 'react'
import "./Leaderboard.css";

const Leaderboard = () => {
    const [stats, setStats] = useState([]);

        useEffect(() => {
             fetch('/leaderboard')
            .then(response => response.json())
            .then(data => {
                setStats(data.Items?.map(i => ({
                    username: i.account?.accountName,
                    losses: i.account?.gamesLost,
                    wins: i.account?.gamesWon,
                    rank: i.account?.rank

                })) 
                ?? ["error fetching leaderbaord"])
            })
    
        },[])


    return(
          <div className="container">
               <Navbar />
             <head>
                <title>Gamer Leaderboard</title>
            </head>
                 <h1 className="page-name">Leaderboard</h1>
            <div className="sections">
                <div className="section-left" id="global-leaderboard">
                    <h2 className="global-title">Global Leaderboard</h2>
                        <table className ="table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Player</th>
                                    <th>Gamer Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.map((s,index) => (
                                    <tr key={s.username}>
                                        <td>{index + 1}</td>
                                        <td>{s.username}</td>
                                        <td>{s.wins - s.losses}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
                <div className="section-right">
                    <h2 className ="stats-title">Gamer Stats</h2>
                    <h4>Selected Gamer: UsualMaster1456</h4>
                    <table className="table">
                            <tbody>
                                <tr>
                                    <td>Games Won</td>
                                    <td>13</td>
                                </tr>          
                                <tr>
                                    <td>Games Lost</td>
                                    <td>15</td>
                                </tr>
                                  <tr>
                                    <td>Best Game</td>
                                    <td>Tic Tac Toe</td>
                                </tr>
                                  <tr>
                                    <td>Worst Game</td>
                                    <td>Connect Four</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard;