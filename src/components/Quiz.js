import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Question from "./Question";
import ScoreInformation from "./ScoreInformation";
import {nanoid} from "nanoid"
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


function Quiz({playerName}) {
    const [question, setQuestion] = useState(false);
    const [globalScores, setGlobalScores] = useState(false)
    const [questionsList, setQuestionsList] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0)
    const [quizComplete, setQuizComplete] = useState(false)
    const [questionComplete, setQuestionComplete] = useState(false)
    const [preventMultiClick, setPreventMultiClick] = useState(false)
    const [playerAnswer, setPlayerAnswer] = useState(false)
    const [newQuestion, setNewQuestion] = useState(0)
    const [difficulty, setDifficulty] = useState("easy")
    const [fiftyFifty, setFiftyFifty] = useState(false)
    const [fiftyFiftyStatus, setFiftyFiftyStatus] = useState(true)
    const [score, setScore] = useState({
        name: playerName,
        score: 0

    })

    if(playerName == ''){
        window.open("/","_self");
    }
    const questionAmount = 1;
    const scoreCollectionRef = collection(db,"highscores")

    useEffect(() => {
            let q = fetch(`https://opentdb.com/api.php?amount=50&type=multiple&${difficulty}`)
                .then(res => res.json())
                .then(data =>setQuestionsList(data.results))
    },[difficulty])

    useEffect(() => {
                setQuestion(questionsList[0]);
                setQuestionNumber(prev=>prev+1)
                setPlayerAnswer(false);
                setPreventMultiClick(false)
                setQuestionComplete(false)
                setQuestionsList(prevList =>{
                    prevList.splice(0,1)
                    return prevList
                })
                questionNumber == 7 && setDifficulty("medium")
                questionNumber == 14 && setDifficulty("hard")
        },[newQuestion])

        useEffect(() => {
            const getScores = async() =>{
                const data = await getDocs(scoreCollectionRef);
                setGlobalScores(data.docs.map((doc) =>({
                  ...doc.data(), id:doc.id
                })))}
                getScores();
            },[quizComplete])
    
        question == undefined && setQuestion(JSON.parse(localStorage.getItem("firstQuestion"))[0])

        async function handleQuestion(event, playerAnswer) {
            console.log(preventMultiClick,questionComplete)
            if (questionComplete || preventMultiClick) return;
            setPreventMultiClick(true);
            setPlayerAnswer(playerAnswer)
            await timeout(1000);
            setQuestionComplete(true);
            await timeout(2000);
            question.correct_answer === playerAnswer ?
            correctAnswer():
            incorrectAnswer()
            fiftyFifty && setFiftyFiftyStatus(false)
            setFiftyFifty(false)
         }

        function handleFiftyFifty(){
            setFiftyFifty(true);
        }

        function timeout(delay) {
            return new Promise( res => setTimeout(res, delay) );
        }

        async function incorrectAnswer(){
            setQuizComplete(true)
            setQuestionNumber(0)
            saveScoreGlobal()
        }

        const saveScoreGlobal = async () => {
            var exists = globalScores && 
            Object.keys(globalScores).some(function(k) {
                return globalScores[k].name === score.name;
            });

            if(exists){
                const player = getPlayerFromHighscore(globalScores, score.name)
                if(score.score > player.score){
                    const userDoc = doc(db, "highscores", player.id);
                    await deleteDoc(userDoc);
                    await addDoc(scoreCollectionRef, score);
                }
            }else{
                await addDoc(scoreCollectionRef, score);

            }
        };

        function getPlayerFromHighscore(obj, value) {
            let result;
            Object.getOwnPropertyNames(obj).some(key => {
              if (obj[key].name === score.name) {
                result = obj[key];
                return true; // Stops the loop
              }
            });
            return result;
          }
          
          async function correctAnswer(){
            !preventMultiClick && setNewQuestion(prev=>prev+1)
            setScore(prev=>({
                ...prev,
                score:prev.score+1
            }));
        }
   
        function handleSubmission(){
            quizComplete &&
            newGame()
        }

        function newGame(){
            setQuizComplete(false);
            setQuestionComplete(false)
            setFiftyFiftyStatus(true)
            setNewQuestion(prev=>prev+1)
            setScore(prev=>({
                ...prev,
                score:0
            }));
        }
    return (
        <div>
            <div className="container">
                    <ScoreInformation name={score.name} highscores={globalScores} score={score.score} />
                    {question && <Question  
                    handleQuestion={handleQuestion} difficulty={difficulty} question={question.question} correct={question.correct_answer} 
                    incorrect={question.incorrect_answers} category={question.category}
                    questionComplete={questionComplete} playerAnswer={playerAnswer} fiftyFifty={fiftyFifty}/> }
                    
                    <div class="menu__items">
                        <div className="lifelines__container">
                                <h4>Lifelines:</h4>
                                <div className="lifelines__list">
                                    {fiftyFiftyStatus && <button className="lifeLine" onClick={handleFiftyFifty}>50/50</button> }
                                </div>
                        </div>
                        <div className="menu__container">
                            {quizComplete && <button className="question__menu__button" onClick={handleSubmission}>Play Again</button> }
                            <a href="/"><button className="question__menu__button">Back to main menu</button></a>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Quiz;