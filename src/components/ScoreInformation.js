import React from "react";

function ScoreInformation({score, name, highscores}) {
    const playerBestScore = highscores ? highscores.filter((score) => score.name == name): false;
    let highestScore = highscores && highscores.reduce((highest, game) => highest.score > game.score ? highest : game);

    return (
     <div className="score__container">
         <p>Name: {name}</p>
         <p>Score: {score}</p>
         <p>Your highest score: {playerBestScore.length? playerBestScore[0].score: '0'}</p>
         <p>Top score: {highestScore && highestScore.name} ({highestScore && highestScore.score})</p>
     </div>
    );
  }
  
  export default ScoreInformation;