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
        const { secondPlayerSign } = this.context

        if (secondPlayerSign === 'x') {
            this.setState(prevState => {
                return {
                    numberOfClicks: prevState.numberOfClicks + 1,
                    isFirstPlayersTurn: this.state.numberOfClicks % 2 === 0
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    numberOfClicks: prevState.numberOfClicks + 1,
                    isFirstPlayersTurn: this.state.numberOfClicks % 2 !== 0
                }
            })
        }
    }

    onComputerSelectFiled = (compPos) => {
        const { secondPlayerSign, setPlayersPositions } = this.context
        const { gameFields, numberOfClicks, winner } = this.state

        if (numberOfClicks < 8 && !winner) {
            const computerField = gameFields.filter(field => {
                var position = parseInt(field.position.match(/\d/g).join(''))

                return position === compPos
            })

            computerField[0].setSign(secondPlayerSign)
            computerField[0].setSelected()
            setPlayersPositions(parseInt(computerField[0].position.match(/\d/g).join('')))

            if (secondPlayerSign === 'x') {
                this.setState(prevState => {
                    return {
                        numberOfClicks: prevState.numberOfClicks + 1,
                        isFirstPlayersTurn: this.state.numberOfClicks % 2 === 0
                    }
                })
            } else {
                this.setState(prevState => {
                    return {
                        numberOfClicks: prevState.numberOfClicks + 1,
                        isFirstPlayersTurn: this.state.numberOfClicks % 2 !== 0
                    }
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.numberOfClicks !== prevState.numberOfClicks) {
            this.declareWinner()
        }
    }

    componentDidMount() {
        const gameFields = gameFieldService.createGameField()
        const { gameMode, secondPlayerSign } = this.context

        this.setState({ gameFields })
        const computersPosition = gamePlayService.randomPosition()
        console.log(computersPosition)

        if (gameMode === 'single-player' && secondPlayerSign === 'x') {
            const computersPosition = gamePlayService.randomPosition()
            console.log(computersPosition)

            this.setState({
                computersInitialPosition: computersPosition
            })
        }
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
            firstPlayersTurn: this.context.firstPlayersTurn,
            numberOfClicks: 0
        })
    }

    render() {
        const { winner, gameFields, isGameOver, isFirstPlayersTurn, computersInitialPosition } = this.state
        const { firstPlayersName, secondPlayersName, firstPlayersTurn } = this.context

        const currentPlayer = isFirstPlayersTurn ? firstPlayersName : secondPlayersName

        console.log(isFirstPlayersTurn);
        // console.log(this.context.secondPlayerSign);
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
