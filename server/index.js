const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

app.use(cors());
app.use(express.json());

//test to get all races
app.get("/races", async(req, res) => {
    try {
        const races = await pool.query("SELECT * FROM races");
        res.json(races.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get specific year
app.get("/races/:year", async(req, res) => {
    try {
        const {year} = req.params;
        const races = await pool.query("SELECT * FROM races WHERE year = $1", [year])
        res.json(races.rows)
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on 5000")
})