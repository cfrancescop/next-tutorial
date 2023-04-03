const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
 
const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  user: process.env.PG_USER || "postgres",
  database: process.env.PG_DB || "postgres",
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || "5432"),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('assets'));
app.use(cors({origin:"*"}));


const getGiochi = (req, res) => {
    pool.query('SELECT * FROM gioco', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

app.get("/giochi", getGiochi);

app.post("/giochi", (req, res) => {
    const gioco = req.body;
    console.log("JSON input");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});