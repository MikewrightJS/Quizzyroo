import Quiz from "./components/Quiz";
import Splash from "./components/Splash";
import Highscore from "./components/Highscore";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react/cjs/react.development";




function App() {

  const [playerName,SetPlayerName ] = useState(localStorage.getItem("name") ? localStorage.getItem("name") : '')

  function handleName(e){
    SetPlayerName(e.target.value);
    localStorage.setItem("name",e.target.value) 
  }
  fetch(`https://opentdb.com/api.php?amount=1&type=multiple&difficulty=easy`)
  .then(res => res.json())
  .then(data =>localStorage.setItem("firstQuestion",JSON.stringify(data.results)))
    
    return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Splash handleName={handleName} playerName={playerName} />} />
          <Route path="quiz" element={<Quiz playerName={playerName} />} />
          <Route path="highscore" element={<Highscore />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
