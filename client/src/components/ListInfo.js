import React,{Fragment, useEffect, useState} from "react";

const ListInfo = () => {
    const [constructor, setConstructor] = useState([]);
    const [driver, setDriver] = useState([]);
    const [race, setRace] = useState([]);
    const [year, setYear] = useState("");
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
        getInfo();
    }, []);

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
                    <th scope="col">Url</th>
                </tr>
            </thead>
            <tbody>
                {constructor.map(entry => (
                    <tr>
                        <td>{entry.position}</td>
                        <td>{entry.name}</td>
                        <td>{entry.points}</td>
                        <td>{entry.url}</td>
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
                <th scope="col">Forename</th>
                <th scope="col">Surname</th>
                <th scope="col">Points</th>
                <th scope="col">Url</th>
            </tr>
        </thead>
        <tbody>
            {driver.map(entry => (
                <tr>
                    <td>{entry.position}</td>
                    <td>{entry.forename}</td>
                    <td>{entry.surname}</td>
                    <td>{entry.points}</td>
                    <td>{entry.url}</td>
                </tr>
            ))}
        </tbody>
        </table>
        </td>
        <td>
        <table class="table mt-5 text-center">
        <thead>
            <tr>
                <th scope="col">Circuit</th>
                <th scope="col">Date</th>
                <th scope="col">Round</th>
                <th scope="col">Url</th>
            </tr>
        </thead>
        <tbody>
            {race.map(entry => (
                <tr>
                    <td>{entry.name}</td>
                    <td>{entry.date}</td>
                    <td>{entry.round}</td>
                    <td>{entry.url}</td>
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