import React, { Component } from 'react'
import { AppContext } from './_context/AppContext';
import { storageService } from '../services/storageService';

export default class AppStore extends Component {
  state = {
    firstPlayerSign: storageService.get('firstPlayerSign') || 'x',
    secondPlayerSign:  storageService.get('secondPlayerSign') || 'o',
    firstPlayersPositions: [],
    secondPlayersPositions: [],
    firstPlayersName: storageService.get('firstPlayersName') || 'First player',
    secondPlayersName: storageService.get('secondPlayersName') || "Second player"
  }

  setSign = (clickedSign) => {
    const isX = clickedSign === 'sign-x'
    this.setState({
      firstPlayerSign:  storageService.save('firstPlayerSign', isX ? 'x' : 'o'),
      secondPlayerSign: storageService.save('secondPlayerSign',isX ? 'o' : 'x')
    })
  }

  setFirstPlayersPositions = (pos) => {
    this.setState(prevState => {
      return {
        firstPlayersPositions: [...prevState.firstPlayersPositions, pos]
      }
    })
  }

  setSecondPlayersPositions = (pos) => {
    this.setState(prevState => {
      return {
        secondPlayersPositions: [...prevState.secondPlayersPositions, pos]
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
        setSign: this.setSign,
        setFirstPlayersPositions: this.setFirstPlayersPositions,
        setSecondPlayersPositions: this.setSecondPlayersPositions,
        onChangePlayersName: this.onChangePlayersName
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
