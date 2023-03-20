import './App.css';
import React, {useState } from "react";
import {BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import CharList from "./charList/CharList";
import CharInfo from "./charList/CharInfo";
import LoginPage from "./component/pages/LoginPage/LoginPage";
import RegisterPage from "./component/pages/RegistrPage/RegisterPage";

const App = () => {
    const [selectedChar,setChar]=useState(null)

    const onCharSelected=(id)=>{
        setChar(id)
    }

  return (
      <Router >
          <div className="App">
              <Routes>
                  <Route path="/login" element={<LoginPage/>} />
                  <Route path="/register" element={<RegisterPage/>} />
                  <Route path="/" element={<CharList onSelectedCard={onCharSelected}/>}/>
                  <Route path="/characters/:charId" element={<CharInfo charId={selectedChar}/>}/>
              </Routes>
          </div>
      </Router>
  );
}

export default App;
