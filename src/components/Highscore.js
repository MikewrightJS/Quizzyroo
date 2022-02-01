import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { db } from "../firebase-config";
import {collection, getDocs} from "firebase/firestore";


function Highscore() {
    const savedScores = localStorage.getItem("score");
    const [savedScoresGlobal, setSavedScoresGlobal] = useState([{}]);
    const savedObj = JSON.parse(savedScores)
    const scoreCollectionRef = collection(db,"highscores")


    useEffect(() =>{
      const getScores = async() =>{
        const data = await getDocs(scoreCollectionRef);
        setSavedScoresGlobal(data.docs.map((doc) =>({
          ...doc.data(), id:doc.id
        })))
      }
      getScores();
    },[])

    // Sort
    savedScoresGlobal.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    
    return (
      <div className="container">
            <h2>Global Highscore</h2>
            <div className="highscore-table">
              {
              savedScoresGlobal.map(score=>{ 
              return <tr>
                  <td>{score.name}</td>
                  <td>{score.score}</td>
                </tr>
              })
          }
          </div>
          <a href="/"><button className="question__menu__button">Back to main menu</button></a>
      </div>
    );
  }
  
  export default Highscore;