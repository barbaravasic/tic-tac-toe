import React from 'react';
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="./images/Tic-Tac-Toe-Game.png" alt="logo" />
                </Link>
            </div>
            <h1>Tic Tac Toe</h1>
        </header>
    );
};

export default Header;