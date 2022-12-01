import './App.css';
import React,{Fragment} from "react";
import { Routes, Route, Link } from 'react-router-dom';
import ListInfo from './components/ListInfo';
import Details from './components/Details';

function App() {
  return (
    <div className = "container">
    <Routes>
        <Route exact path="/" element={<ListInfo/>}/>
        <Route exact path="/details" element={<Details/>}/>
    </Routes>
    </div>
  );
}

export default App;
