import './css/app.css';
import './css/body.css';
import './css/header.css';
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import  Router from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="ease-in-out transition duration-300">
        <Router></Router>
      </div>
    </BrowserRouter>
  );
}

export default App;
