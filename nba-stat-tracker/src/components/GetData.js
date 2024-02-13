import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetData = () => {
  const [standingsData, setStandingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://api-nba-v1.p.rapidapi.com/standings',
        params: { league: 'standard', season: '2021' },
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': 'bbc4048502msh091e06da4bef4aep19a2d0jsn50a77f87e955',
        },
      };

      try {
        const response = await axios(options);
        console.log('API response:', response.data);
        setStandingsData(response.data.api.standings);
      } catch (error) {
        console.error('Error fetching standings:', error);
        setError('Error fetching standings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>NBA Standings - 2021 Season</h1>
      <div id="teams-container">
        {standingsData.map((team) => (
          <div key={team.teamId} className="team-card">
            <div className="team-info">
              <img className="team-logo" src={team.logo} alt="Team Logo" />
              <h2>{team.teamName}</h2>
              <p>Rank: {team.rank}</p>
            </div>
            <div className="team-stats">
              <div>
                <p>Wins: {team.win}</p>
                <p>Losses: {team.loss}</p>
              </div>
              <div>
                <p>Home Wins: {team.homeWin}</p>
                <p>Away Wins: {team.awayWin}</p>
              </div>
              <div>
                <p>Streak: {team.streak}</p>
                <p>Last 10: {team.lastTen}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetData;
