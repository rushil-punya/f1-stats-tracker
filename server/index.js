const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

app.use(cors());
app.use(express.json());

//get all constructors
app.get("/constructors", async(req, res) => {
    try {
        const constructors = await pool.query("SELECT constructorstandings.position, constructors.name, constructorstandings.points, constructors.url FROM constructors JOIN constructorstandings");
        res.json(constructors.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get constructor of specific year
app.get("/constructors/:year", async(req, res) => {
    try {
        const {year} = req.params;
        const constructors = await pool.query("SELECT constructorstandings.position, constructors.name, constructorstandings.points, constructors.url FROM constructors JOIN constructorstandings ON constructors.constructorid = constructorstandings.constructorid WHERE raceid = (SELECT raceid FROM races WHERE round = ( SELECT MAX(round) as lastrace FROM races WHERE year = $1) AND year = $1) ORDER BY position ASC", [year]);
        res.json(constructors.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//get all drivers
app.get("/drivers", async(req, res) => {
    try {
        const drivers = await pool.query("SELECT driverstandings.position, drivers.forename, drivers.surname, driverstandings.points, drivers.url FROM drivers JOIN driverstandings");
        res.json(drivers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get driver of specific year
app.get("/drivers/:year", async(req, res) => {
    try {
        const {year} = req.params;
        const drivers = await pool.query("SELECT driverstandings.position, drivers.forename, drivers.surname, driverstandings.points, drivers.url FROM drivers JOIN driverstandings ON drivers.driverid = driverstandings.driverid WHERE raceid = (SELECT raceid FROM races WHERE round = ( SELECT MAX(round) as lastrace FROM races WHERE year = $1) AND year = $1) ORDER BY position ASC", [year]);
        res.json(drivers.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//get all races
app.get("/races", async(req, res) => {
    try {
        const races = await pool.query("SELECT * FROM races");
        res.json(races.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get race of specific year
app.get("/races/:year", async(req, res) => {
    try {
        const {year} = req.params;
        const races = await pool.query("SELECT circuits.name, circuits.url AS curl, races.date, races.round, races.url, races.raceid FROM races JOIN circuits ON races.circuitid = circuits.circuitid WHERE year = $1", [year]);
        res.json(races.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//get specfic race information - standings
app.get("/details/:raceid", async(req, res) => {
    try {
        const {raceid} = req.params;
        const results = await pool.query("SELECT results.position, drivers.forename, drivers.surname, results.points, results.grid, drivers.url FROM drivers JOIN results ON drivers.driverid = results.driverid WHERE raceid = $1 ORDER BY position ASC", [raceid]);
        
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
    }
})


app.get("/detailsquali/:raceid", async(req, res) => {
    try {
        const {raceid} = req.params;
       
        const position = await pool.query("SELECT results.grid, drivers.forename, drivers.surname, drivers.url FROM drivers JOIN results ON drivers.driverid = results.driverid WHERE raceid = $1 ORDER BY grid ASC", [raceid]);
        res.json(position.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on 5000")
})