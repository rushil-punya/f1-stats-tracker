import React,{Fragment, useEffect, useState} from "react";
import { Route, Link, json } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { setRaceId, setCircuitUrl, setCircuit, setRound, setY, setUrl } from "./Details";

const ListInfo = () => {
    const [constructor, setConstructor] = useState([]);
    const [driver, setDriver] = useState([]);
    const [race, setRace] = useState([]);
    const [year, setYear] = useState("");
    
    let navigate = useNavigate();
    const newPage = async (raceid, circuitid, round, url, curl, name) =>{
       
       // raceid.preventDefault();
        try {
            var response;
            response = await fetch("http://localhost:5000/details/" + raceid);
        } catch (error) {
            console.error(error.message);
        }
        var jsonData = await response.json();
        //console.log(jsonData);
        //setJson(jsonData);
        setRaceId(raceid);
        //setCircuitId(circuitid);
        setRound(round);
        setCircuit(name);
        setUrl(url)
        setCircuitUrl(curl);
       // console.log('yyyy' + year);
        setY(year);
        navigate("details")

    }
    const getInfo = async e => {
        e.preventDefault();
        try {
            var response;
            if(year != null)
            {
                response = await fetch("http://localhost:5000/constructors/" + year);
            }
            else
            {
                response = await fetch("http://localhost:5000/constructors/");
            }
            
            var jsonData = await response.json();
            setConstructor(jsonData);

            if(year != null)
            {
                response = await fetch("http://localhost:5000/drivers/" + year);
            }
            else
            {
                response = await fetch("http://localhost:5000/drivers/");
            }
            
            jsonData = await response.json();
            setDriver(jsonData);    

            if(year != null)
            {
                response = await fetch("http://localhost:5000/races/" + year);
            }
            else
            {
                response = await fetch("http://localhost:5000/races/");
            }
            
            jsonData = await response.json();
            setRace(jsonData);    
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        //getInfo();
    }, []);


    const formatDate = (date) => {
      //  console.log(date);
      //  const dateformatted = new Date(date);
       // console.log(dateformatted);
        return date;
    }

    return <Fragment>
        <h1 className="text-center mt-5">Enter the year you want to search</h1>
        <form className="d-flex mt-5" onSubmit={getInfo}>
            <input type = "text" id = "year" className = "form-control mr-3" value = {year} onChange={e => setYear(e.target.value)}/>
            <button className = "btn btn-success">Search</button>
        </form>
        <table class="table mt-5 mr-5 text-center">
        <thead>
            <tr>
                <th scope="col">Constructors</th>
                <th scope="col">Drivers</th>
                <th scope="col">Races</th>
            </tr>
        </thead>
        <tbody>
        <tr>
        <td>
            <table class="table mt-5 text-center">
            <thead>
                <tr>
                    <th scope="col">Position</th>
                    <th scope="col">Name</th>
                    <th scope="col">Points</th>
                </tr>
            </thead>
            <tbody>
                {constructor.map(entry => (
                    
                    <tr>
                        <td>{entry.position}</td>
                        <td><a href = {entry.url}>{entry.name}</a></td>
                        <td>{entry.points}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
            </table>
        </td>
        <td>
        <table class="table mt-5 text-center">
        <thead>
            <tr>
                <th scope="col">Position</th>
                <th scope="col">Name</th>
                <th scope="col">Points</th>
            </tr>
        </thead>
        <tbody>
            {driver.map(entry => (
                <tr>
                    <td>{entry.position}</td>
                    <td><a href = {entry.url}>{entry.forename} {entry.surname}</a></td>
                    <td>{entry.points}</td>
                </tr>
            ))}
        </tbody>
        </table>
        </td>
        <td>
        <table class="table mt-5 text-center">
        <thead>
            <tr>
                <th scope="col">Round</th>
                <th scope="col">Circuit</th>
                <th scope="col">Date</th>
                <th scope="col">Details</th>
            </tr>
        </thead>
        <tbody>
            {race.map(entry => (
                <tr>
                    
                    <td>{entry.round}</td>
                    <td><a href = {entry.curl}>{entry.name}</a></td>
                    <td>{formatDate(entry.date)}</td>
                    <td><button className = "btn btn-failure" type="button" onClick={() => newPage(entry.raceid, entry.circuitid, entry.round, entry.url, entry.curl, entry.name)}>Click Me!</button></td>
                </tr>
            ))}
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
    </Fragment>
}

export default ListInfo;