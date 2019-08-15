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
        isFirstPlayersTurn: this.context.firstPlayersTurn,
        winner: '',
        isGameOver: false,
        computersInitialPosition: 0
    }

    onSelectField = () => {

        this.setState(prevState => {
            return {
                numberOfClicks: prevState.numberOfClicks + 1,
                isFirstPlayersTurn: !prevState.isFirstPlayersTurn
            }
        })
    }

    onComputerSelectFiled = (compPos) => {
        const { secondPlayerSign, setPlayersPositions } = this.context
        const { gameFields, numberOfClicks, winner, isFirstPlayersTurn } = this.state

        if (numberOfClicks <= 8 && !winner && !isFirstPlayersTurn) {

            const computerField = gameFields.filter(field => {
                var position = parseInt(field.position.match(/\d/g).join(''))

                return position === compPos
            })

            computerField[0].setSign(secondPlayerSign)
            computerField[0].setSelected()
            setPlayersPositions(parseInt(computerField[0].position.match(/\d/g).join('')))

            this.onSelectField()
        }
    }

    getInitialComputerField() {
        const computersPosition = gamePlayService.randomPosition()

        this.setState({
            computersInitialPosition: computersPosition
        })

        return this.state.gameFields.filter(field => {
            var position = parseInt(field.position.match(/\d/g).join(''))

            return position === computersPosition
        })
    }


    componentDidUpdate(prevProps, prevState) {
        const { gameMode, secondPlayerSign, setPlayersPositions } = this.context

        
        if (this.state.numberOfClicks !== prevState.numberOfClicks) {
            this.declareWinner()
        }
        
        if (gameMode === 'single-player' && secondPlayerSign === 'x' && this.state.computersInitialPosition === 0) {
            
            const computerField = this.getInitialComputerField()
            computerField[0].setSign(secondPlayerSign)
            computerField[0].setSelected()
            setPlayersPositions(parseInt(computerField[0].position.match(/\d/g).join('')))

            this.onSelectField()
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
        this.context.switchPlayersSigns()

        this.setState({
            isGameOver: false,
            gameFields,
            winner: '',
            isFirstPlayersTurn: !this.context.firstPlayersTurn,
            numberOfClicks: 0,
            computersInitialPosition: 0
        })
    }

    render() {
        const { winner, gameFields, isGameOver, isFirstPlayersTurn, computersInitialPosition } = this.state
        const { firstPlayersName, secondPlayersName } = this.context

        const currentPlayer = isFirstPlayersTurn ? firstPlayersName : secondPlayersName

        return (
            <div className="game-page">
                <Score />
                {!isGameOver && <h4>{currentPlayer}'s turn...</h4>}
                <div className="game-table">
                    {gameFields.map(field => <GameField key={field.position}
                        field={field}
                        firstPlayersTurn={isFirstPlayersTurn}
                        onSelectField={this.onSelectField}
                        isGameOver={isGameOver}
                        onComputerSelectFiled={this.onComputerSelectFiled}
                        computersInitialPosition={computersInitialPosition}
                    />)}
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
