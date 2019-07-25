import React from 'react'
import { withRouter } from 'react-router-dom'

const Header = ({ ...props }) => {

    const onLogoClick = () => {
        props.history.push('/')
        window.location.reload()
    }
    return (
        <header className="header">
            <div className="logo" onClick={onLogoClick}>
                <img src="./images/Tic-Tac-Toe-Game.png" alt="logo" />
            </div>
            <h1>Tic Tac Toe</h1>
        </header>
    );
};

export default withRouter(Header);