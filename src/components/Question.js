import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from "react/cjs/react.development";



function Question({question, correct, incorrect, category, handleQuestion, playerAnswer, questionComplete, fiftyFifty, difficulty}) {

  const [shuffAnswers, setShuffAnswers] = useState(false)
  useEffect(() => {
    playerAnswer ? 
      updateAnswers():
    fiftyFifty?
    handleFiftyFifty():
    shuffleAnswers();

},[question, fiftyFifty, playerAnswer,questionComplete])


function shuffleAnswers(){
  let answers = incorrect.concat(correct);
  const shuffledArray = answers.sort((a, b) => 0.5 - Math.random());
  setShuffAnswers(shuffledArray.map(ans=>({
    answer:ans, 
    class: 'answer__button'
  })))
}

function handleFiftyFifty(){
  let answers = [incorrect[Math.floor(Math.random() * 2)],correct]
  setShuffAnswers(answers.map(ans =>({
    answer: ans,
    class:'answer__button'
  })))
}

function updateAnswers(){
  setShuffAnswers(oldAnswers => oldAnswers.map(ans => {
    return ans.answer === correct ?
    {...ans, class:questionComplete? 'answer__button green' : ans.answer === playerAnswer? 'answer__button answer__selected' : 'answer__button'} :
      ans.answer === playerAnswer ? 
        {...ans, class:'answer__button answer__selected'} :
        ans
     
}))
}

return (
      <div className="question__card">
      <h5 className="question__category">{category}</h5>
      <div className="difficulty">Difficulty: {difficulty}</div>

       
          
        <div className="question" dangerouslySetInnerHTML ={{__html: question}}></div>
        <div className="answers">
        {shuffAnswers && shuffAnswers.map(answer=>{
            return <button dangerouslySetInnerHTML ={{__html: answer.answer}} 
            onClick={e => handleQuestion(e, answer.answer )} 
            className={answer.class}>
                
                </button>
        })}
        </div>
      </div>
    );
  }
  
  export default Question;