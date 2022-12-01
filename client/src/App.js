import './App.css';
import React,{Fragment} from "react";
import { Route, Link } from 'react-router-dom';
import ListInfo from './components/ListInfo';
import Details from './components/Details';

function App() {
  return (
    <Fragment>
      <div className = "container">
        <ListInfo/>
        <Route exact to="/details" component={Details}/>
      </div>
    </Fragment>
  );
}

export default App;
