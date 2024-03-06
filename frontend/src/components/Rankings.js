import React, { useState } from 'react';
import axios from 'axios';

function Rankings() {
  const [year, setYear] = useState(1998);
  const [rankings, setRankings] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setYear(e.target.value);
    try {
      const response = await axios.get(`http://localhost:2000/rankings/${year}`);
      setRankings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error getting data.', error);
    }
  };

  return (
    <div className="rankings">
      <form className="slider">
        <label>Player Rankings from {year}</label>
        
        <br />
        <input type="range" value={year} min="1998" max="2021" onChange={handleSubmit} />
        <br />
      </form>
      <br />
      <p className="slider">Data from 1998 - 2021</p>
      <br />

      {rankings.map((category, index) => {
        // Check if the category is an array (player data)
        if (Array.isArray(category) && category.length > 0) {
          const categoryKey = Object.keys(category[0])[0];
          const categoryLabel = categoryKey.replace('player_', '');

          return (
            <table key={index} className={`${categoryLabel}-stats`} border="1">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>{categoryLabel}</th>
                </tr>
              </thead>
              <tbody>
                {category.map((player, playerIndex) => (
                  <tr key={playerIndex}>
                    <td>{player[categoryKey]}</td>
                    <td>{player[categoryLabel]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }

        // If it's not an array, it's metadata; you can skip or handle it as needed
        return null;
      })}
    </div>
  );
}

export default Rankings;
