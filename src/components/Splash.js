import React from "react";
import { useState, useEffect } from "react/cjs/react.development";

function Splash({playerName, handleName}) {

  function handleNameStart(){
      if(playerName != ''){
        window.open("/quiz","_self");
      }else{
        alert('Pick a name')
      }
  }
  return (
      <div className="App">
         <div className="container">
            <h1 className="title">Quizzyrooo</h1>
            <p className="sub-text">Take the general knowledge quiz</p>
            <input className="playerName" value={playerName} onChange={e=> handleName(e)} name="playerName" />
            <button onClick={handleNameStart} className="start-button">Start quiz</button>
            <a href="highscore"><button className="start-button">Highscore</button></a>
            </div>
      </div>
    );
  }
  
  export default Splash;