import React, { Component } from 'react'
import GameField from '../components/GameField';
import { AppContext } from '../_context/AppContext';
import { gameFieldService } from '../../services/gameFieldsService';
import { gamePlayService } from '../../services/gamePlayService';
import Score from '../components/Score';

export default class GamePage extends Component {
    static contextType = AppContext;

    state = {
        gameFields: [],
        numberOfClicks: 0,
        firstPlayersTurn: true,
        winner: '',
        isGameOver: false
    }

    onSelectField = () => {
        
        this.setState(prevState => {
            return {
                numberOfClicks: prevState.numberOfClicks + 1,
                firstPlayersTurn: this.state.numberOfClicks % 2 !== 0
            }
        })
    }
    
    onComputerSelectFiled = (compPos) => {
        const { secondPlayerSign, setPlayersPositions } = this.context
        const { gameFields } = this.state
        const computerField = gameFields.filter(field => {
            var position = parseInt(field.position.match(/\d/g).join(''))
            
            return position === compPos
        })
        
        computerField[0].setSign(secondPlayerSign)
        computerField[0].setSelected()
        setPlayersPositions(computerField[0].position.match(/\d/g).join(''))

        this.setState(prevState => {
            return {
                numberOfClicks: prevState.numberOfClicks + 2,
                firstPlayersTurn: this.state.numberOfClicks % 2 === 0
            }
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.numberOfClicks !== prevState.numberOfClicks) {
            this.declareWinner()
        }
    }

    componentDidMount() {
        const gameFields = gameFieldService.createGameField()

        this.setState({ gameFields })
    }

    declareWinner = () => {

        const { firstPlayersPositions, secondPlayersPositions, firstPlayersName, secondPlayersName, setPlayersScore } = this.context

        const firstPlayersCombo = gamePlayService.createPlayersCombo(firstPlayersPositions)
        const secondPlayersCombo = gamePlayService.createPlayersCombo(secondPlayersPositions)


        if (gamePlayService.isWinningCombo(firstPlayersCombo)) {
            this.setState({
                winner: firstPlayersName,
                isGameOver: true
            })
            setPlayersScore(true)
        } else if (gamePlayService.isWinningCombo(secondPlayersCombo)) {
            console.log(secondPlayersPositions)
            this.setState({
                winner: secondPlayersName,
                isGameOver: true
            })
            setPlayersScore()
        } else if (this.state.numberOfClicks >= 9) {
            this.setState({
                winner: "No one",
                isGameOver: true
            })
        }
    }

    onReload = () => {
        const gameFields = gameFieldService.createGameField()
        this.context.resetPlayersPositions()
        this.setState({
            isGameOver: false,
            gameFields,
            winner: '',
            firstPlayersTurn: true,
            numberOfClicks: 0
        })
    }

    render() {
        const { winner, firstPlayersTurn, gameFields, isGameOver } = this.state
        const { firstPlayersName, secondPlayersName } = this.context

        const currentPlayer = firstPlayersTurn ? firstPlayersName : secondPlayersName

        return (
            <div className="game-page">
                <Score />
                {!isGameOver && <h4>{currentPlayer}'s turn...</h4>}
                <div className="game-table">
                    {gameFields.map(field => <GameField key={field.position} field={field} firstPlayersTurn={firstPlayersTurn} onSelectField={this.onSelectField} isGameOver={isGameOver} onComputerSelectFiled={this.onComputerSelectFiled}/>)}
                </div>

                {winner && isGameOver && (
                    <div className="winner-container-overlay">
                        <div className="winner">{winner} wins!</div>
                        <button className="reload btn" onClick={this.onReload}>Play again</button>
                    </div>
                )}
            </div>
        )
    }
}
