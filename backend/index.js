const express = require("express")
const cors = require("cors")
const dbConnection = require("./config")
var bodyParser = require('body-parser');


var app = express(express.json);
app.use(cors());
app.use(bodyParser.json());
app.listen(2000, () => {
    console.log("Express server is running and listening");
});

// get mvps and their pts per game from the last inputted years


app.get('/rankings/:year', (req, resp) => {
    const year = req.params.year;
    const sqlQuery = `
        SET @selectedSeasonStart = ?;

        SELECT name AS player_PTS, PTS
        FROM player
        WHERE season_start = @selectedSeasonStart
        ORDER BY PTS DESC
        LIMIT 5;

        SELECT name AS player_AST, AST
        FROM player
        WHERE season_start = @selectedSeasonStart
        ORDER BY AST DESC
        LIMIT 5;

        SELECT name AS player_3P, 3P
        FROM player
        WHERE season_start = @selectedSeasonStart
        ORDER BY 3P DESC
        LIMIT 5;

        SELECT name AS player_REB, TRB AS REB
        FROM player
        WHERE season_start = @selectedSeasonStart
        ORDER BY REB DESC
        LIMIT 5;

        SELECT name AS player_BLK, BLK
        FROM player
        WHERE season_start = @selectedSeasonStart
        ORDER BY BLK DESC
        LIMIT 5;

        SELECT name AS player_STL, STL
        FROM player
        WHERE season_start = @selectedSeasonStart
        ORDER BY STL DESC
        LIMIT 5;
    `;

    dbConnection.query(sqlQuery, [year], (err, result) => {
        if (err) {
            return resp.status(400).json({ error: "Error in the SQL statement." });
        }
        // resp.setHeader('Query', sqlQuery);
        return resp.status(200).json(result);
    })
});



app.get('/mvp/pts/:year', (req, resp) => {
    const year = req.params.year;
    if (isNaN(year)) {
        return resp.status(400).json({ error: "Error, please enter a valid number." });
    }
    const sqlQuery = "SELECT name, season_end, pts from player " +
        "WHERE mvp = 'TRUE' AND season_start >= YEAR(CURDATE()) - " + year + ";";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return resp.status(400).json({ error: "Error in the SQL statement." });
        }
        resp.setHeader('Query', sqlQuery);
        return resp.status(200).json(result);
    });
});



