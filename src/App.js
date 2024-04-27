import React, {useEffect, useState} from "react";
import Dies from './Dies'
import Confetti from 'react-confetti';
import './App.css';

export default function App(){

    const [dies, setDies] = useState(Dies);
    const [finish, setFinish] = useState(false);
    const [rolls, setTRolls] = useState(0);
    const [timer, setTimer] = useState('00:00');
    const [gameStart, setGameStart] = useState(0);
    const [getIntId, setIntId] = useState(0);
    
    useEffect(()=>{
        let isFinish = dies.every(die => die.isTrigger);
        let sameVal = dies.every(die => die.value === dies[0].value);
        setFinish(isFinish && sameVal);

        
        if(gameStart === 1){
          
          let sec = 0;
          let num = 0;
          let min = '00';
              
          const timer = setInterval(() => {
              sec++;
              if(sec > 59){
                num++;
                min = '0'+num;
                if(min > 9){
                  min = num;
                }
              }
              sec = (sec < 10) ? '0' + sec : (sec > 59) ? '00' : sec;
              setTimer(min + ':' + sec);
          }, 1000);
          
          setIntId(timer)
        }
        
        return () => {
          if(isFinish && sameVal){
            clearInterval(getIntId)
          }
        }


    }, [dies, finish])

    function toggleDies(die){
        setDies(prev => (prev.map(cardDie => cardDie.id === die.id ? {...cardDie, isTrigger: !cardDie.isTrigger} : cardDie)));
        setGameStart(preVal => preVal + 1)
    }


    function getRandom(){
        return Math.floor(Math.random() * 6) + 1; 
    }
    
    function gameRestart(){
        setDies(prev => (prev.map(cardDie => ({...cardDie, isTrigger: false, value: getRandom()}))))
    }


    function roll(){
      let someVal = dies.some(die => die.isTrigger === true);
      if(finish){
        gameRestart()
        setTRolls(0);
        setTimer('00:00')
        setGameStart(0)
      }else{
        setDies(prev => (prev.map(cardDie => !cardDie.isTrigger ? {...cardDie, value: getRandom()} : cardDie)))
        setTRolls(prev => someVal ? prev + 1 : 0);
        }
    }

    const dieCards = dies.map(die => <div className="die--card" key={die.id} style={die.isTrigger ? {color: '#75e9dd'}: {}} onClick={() => toggleDies(die)}><img src={die.isTrigger ? `../img/dies-filled-${die.value}.webp` : `../img/dies-outline-${die.value}.webp`} alt={die.id} /></div>)

    return(
        <div className="dies-wrapper">
            <h3 className="win-title">Tenzies</h3>
            {finish && <Confetti />}
            {finish && <h3 className="win-title">🎉 You win! 🎉</h3>}
            {!finish && <p className="win-content">Keep rolling the dice until they all show the same number. Click on each die to lock its current value before rolling again.</p>}

            <div className="status-flex">
              <p>Timer: <strong>{timer}</strong></p>
              <p>Rolls: <strong>{rolls}</strong></p>
            </div>
            <div className="text-center">
                <div className={finish ? 'dies-parent finished' : 'dies-parent'}>
                    {dieCards}
                </div>
                <div className="button-wrapper">
                  <button onClick={roll} className="roll-button">{finish ? 'Restart Game' : 'Roll Dies'}</button>
                </div>
            </div>
        </div>
    )
}
