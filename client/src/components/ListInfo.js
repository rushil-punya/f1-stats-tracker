import React,{Fragment, useEffect, useState} from "react";

const ListInfo = () => {
    const [info, setInfo] = useState([]);
    const [year, setYear] = useState("");
    const getInfo = async e => {
        e.preventDefault();
        try {
            var response;
            if(year != null)
            {
                response = await fetch("http://localhost:5000/races/" + year);
            }
            else
            {
                response = await fetch("http://localhost:5000/races/");
            }
            
            const jsonData = await response.json();
            setInfo(jsonData);  
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
        <table class="table mt-5 text-center">
        <thead>
            <tr>
            <th scope="col">Description</th>
            </tr>
        </thead>
        <tbody>
            {/*<th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>*/}
            {info.map(entry => (
                <tr>
                    <td>{entry.year}</td>
                </tr>
            ))}
        </tbody>
        </table>
    </Fragment>
}

export default ListInfo;