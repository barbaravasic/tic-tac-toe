import React, { Component } from 'react'
import { AppContext } from './_context/AppContext';

export default class AppStore extends Component {
    state={
        isX: true
    }

    setSign = (clickedSign) => {
      this.setState({
        isX: clickedSign === 'sign-x'
      })
    }

  render() {
    return (
      <AppContext.Provider value = {{
          ...this.state,
          setSign: this.setSign
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
