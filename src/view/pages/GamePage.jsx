import React, { Component } from 'react'
import GameField from '../components/GameField';
import { AppContext } from '../_context/AppContext';
import { gameFieldService } from '../../services/gameFieldsService';
import { gamePlayService } from '../../services/gamePlayService';

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

        const { firstPlayersPositions, secondPlayersPositions, firstPlayersName, secondPlayersName } = this.context

        const firstPlayersCombo = gamePlayService.createPlayersCombo(firstPlayersPositions)
        const secondPlayersCombo = gamePlayService.createPlayersCombo(secondPlayersPositions)


        if (gamePlayService.isWinningCombo(firstPlayersCombo)) {
            this.setState({
                winner: firstPlayersName,
                isGameOver: true
            })
        } else if (gamePlayService.isWinningCombo(secondPlayersCombo)) {
            this.setState({
                winner: secondPlayersName,
                isGameOver: true
            })
        } else if (this.state.numberOfClicks === 9) {
            this.setState({
                winner: "No one",
                isGameOver: true
            })
        }
    }

    onReload = () => {
        window.location.reload();
    }

    render() {
        const { winner, firstPlayersTurn, gameFields, isGameOver } = this.state
        return (
            <div className="game-page">
                <div className="game-table">
                    {gameFields.map(field => <GameField key={field.position} field={field} firstPlayersTurn={firstPlayersTurn} onSelectField={this.onSelectField} isGameOver={isGameOver} />)}
                </div>

                {winner && (
                    <div className="winner-container-overlay">
                        <div className="winner">{winner} wins!</div>
                        <button className="reload btn" onClick={this.onReload}>Reload</button>
                    </div>
                )}
            </div>
        )
    }
}
