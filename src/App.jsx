import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import diceImg from "./images/dice.png"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: dieFace(),
            isHeld: false,
            id: nanoid()
        }
    }

    function dieFace() {
        const randomNum = Math.ceil(Math.random() * 6)

        switch(randomNum) {
            case 1:
                return "⚀"
            case 2:
                return "⚁"
            case 3:
                return "⚂"
            case 4:
                return "⚃"
            case 5:
                return "⚄"
            case 6:
                return "⚅"
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRollCount(oldCount => oldCount + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRollCount(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    const titleStyles = {
        color: tenzies ? "#59E391" : "black"
    }

    return (
        <main>
            {tenzies && <Confetti/>}
            <div className="title">
                <div className="title-logo">
                    <img src={diceImg} className="title-img" alt="Dice icon"/>
                    <h1 className="title-text" style={titleStyles}>Tenzies</h1>
                </div>
                <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
                <div className="roll-count">
                    <h3 className="roll-count-text">Roll count: {rollCount}</h3>
                </div>
            </div>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}