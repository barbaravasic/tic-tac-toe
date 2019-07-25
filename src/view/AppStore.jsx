import React, { Component } from 'react'
import { AppContext } from './_context/AppContext';

export default class AppStore extends Component {
  state = {
    firstPlayerSign: 'x',
    secondPlayerSign: 'o',
    firstPlayersPositions: [],
    secondPlayersPositions: []
  }

  setSign = (clickedSign) => {
    const isX = clickedSign === 'sign-x'
    this.setState({
      firstPlayerSign: isX ? 'x' : 'o',
      secondPlayerSign: isX ? 'o' : 'x'
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

  render() {
    return (
      <AppContext.Provider value={{
        ...this.state,
        setSign: this.setSign,
        setFirstPlayersPositions: this.setFirstPlayersPositions,
        setSecondPlayersPositions: this.setSecondPlayersPositions
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
