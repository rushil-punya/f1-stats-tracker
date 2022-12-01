import React,{Fragment, useEffect, useState} from "react";
import { Route, Link, json } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


var raceid;
var circuitid;
var year; 
var round;
var circuitname;
var url;
var circuiturl;

    
export function setRaceId(id) {
    raceid = id;
    console.log(raceid);
}

export function setCircuitUrl(u) {
    circuiturl = u;
}

export function setY(y) {
    year = y;
    console.log(year);
}
export function setRound(r) {
    round = r;
    console.log(round);
}
export function setCircuit(c) {
    circuitname = c;
    console.log(circuitname);
}

export function setUrl(u) {
    url = u;
    console.log(url);
}


const Details = () => {


    const [standings, setStandings] = useState([]);
    //const [driver, setDriver] = useState([]);
    
    


    const getInfo = async e => {

        try {
            var response;
            response = await fetch("http://localhost:5000/details/" + raceid);
        } catch (error) {
            console.error(error.message);
        }
        var jsonData = await response.json();

        setStandings(jsonData);  



        console.log(standings);

    }

    useEffect(() => {
        getInfo();
        console.log("ue");
    }, []);
    
        
        return(
            <body>
            <h1><a href = {url}> {year} Season : Round {round}</a></h1>
            <h2><a href={circuiturl}> {circuitname} </a> </h2>
            <div> </div>
            <table class="table mt-5 mr-5 text-center">
            <thead>
                <tr>
                    
                    <th scope="col">Final Results</th>
                </tr>
            </thead>
            
                <tbody>
                    <tr>
                        <td>
                            <table class="table mt-5 text-center">
                                <thead>
                                <th scope="col">Position</th>
                                <th scope="col">Name</th>
                                <th scope="col">Points</th>
                                <th scope="col">Grid</th>
                                </thead>
                                <tbody>
                {standings.map(entry => (
                    
                    <tr>
                        <td>{entry.position? entry.position: 'DNF'}</td>
                        <td><a href = {entry.url}>{entry.forename} {entry.surname}</a></td>
                        <td>{entry.points}</td>
                        <td>{entry.grid}</td>
                    </tr>
                ))}
            </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
            </body>
        )
    }


export default Details;
/*
{jsonData.map(entry => (
                    <tr>
                        <td>{entry.position}</td>
                    </tr>
                ))}
*/