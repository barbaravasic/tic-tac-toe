import React, { Component } from 'react'
import { AppContext } from './_context/AppContext';
import { storageService } from '../services/storageService';

export default class AppStore extends Component {
  state = {
    gameMode: storageService.get('gameMode') || null,
    firstPlayerSign: 'x',
    secondPlayerSign: 'o',
    firstPlayersTurn: true,
    firstPlayersPositions: [],
    secondPlayersPositions: [],
    firstPlayersName: storageService.get('firstPlayersName') || 'First player',
    secondPlayersName: storageService.get('secondPlayersName') || "Second player",
    firstPlayersScore: 0,
    secondPlayersScore: 0
  }

  setGameMode = (chosenMode) => {
    const isSinglePlayer = chosenMode === 'single-player'
    this.setState({
      gameMode: storageService.save('gameMode', isSinglePlayer ? 'single-player' : 'two-players'),
      secondPlayersName: isSinglePlayer ? storageService.save('secondPlayersName', 'Computer') : storageService.save('secondPlayersName', 'Second player')
    })
  }

  switchPlayersSigns = () => {
    this.setState(prevState => {
      return {
        firstPlayerSign: prevState.firstPlayerSign === 'x' ? 'o' : 'x',
        secondPlayerSign: prevState.secondPlayerSign === 'x' ? 'o' : 'x',
        firstPlayersTurn: !prevState.firstPlayersTurn
      }
    })
  }

  setPlayersPositions = (pos, isFirstPlayer = false) => {
    const stateItem = isFirstPlayer ? 'firstPlayersPositions' : 'secondPlayersPositions'
    this.setState(prevState => {
      return {
        [stateItem]: [...prevState[stateItem], pos]
      }
    })
  }

  resetPlayersPositions = () => {
    this.setState({
      firstPlayersPositions: [],
      secondPlayersPositions: []
    })
  }

  setPlayersScore = (isFirstPlayer = false) => {
    const stateItem = isFirstPlayer ? 'firstPlayersScore' : 'secondPlayersScore'
    this.setState(prevState => {
      return {
        [stateItem]: prevState[stateItem] + 1
      }
    })

  }

  onChangePlayersName = (inputId, value) => {
    this.setState({
      [inputId]: storageService.save([inputId], value)
    })
  }


  render() {
    return (
      <AppContext.Provider value={{
        ...this.state,
        setGameMode: this.setGameMode,
        switchPlayersSigns: this.switchPlayersSigns,
        setPlayersPositions: this.setPlayersPositions,
        onChangePlayersName: this.onChangePlayersName,
        setPlayersScore: this.setPlayersScore,
        resetPlayersPositions: this.resetPlayersPositions
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
