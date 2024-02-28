import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function Graph() {
    const [players, setPlayers] = useState([]);
    const [year, setYear] = useState(1);
    const chartRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:2000/mvp/pts/${year}`);
            setPlayers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error getting data.', error);
        }
    };

    const handleChange = (e) => {
        setYear(e.target.value);
    };

    useEffect(() => {
        if (chartRef.current) {
            const chartCanvas = chartRef.current.getContext('2d');
    
            // Destroy the previous chart if it exists
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
    
            chartRef.current.chart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: players.map((player) => player.name + " " + player.season_end),
                    datasets: [
                        {
                            label: 'Points',
                            data: players.map((player) => player.pts),
                        },
                    ],
                },
            });
        }
    }, [players]);
    


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>MVP average PPG from the last {year} years</label>
                <br />
                <input type="range" value={year} min="1" max="20" onChange={handleChange} />
                <br />
                <button type="submit">Submit</button>
            </form>
            {/* <table className="container">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Points</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, p) => (
                        <tr key={p}>
                            <td>{player.name}</td>
                            <td>{player.pts}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <br />
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default Graph;
