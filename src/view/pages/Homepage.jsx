import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../_context/AppContext';
import GameMode from '../components/GameMode';

const Homepage = () => {
    const {gameMode} = useContext(AppContext)

    return (
        <div className="homepage">
            <h2 className="title">Welcome to Tic Tac Toe game</h2>
            <GameMode />
            {gameMode ? 
            <Link to="/player-info" className="btn">Nastavi</Link>
            : <Link to="#" className="btn disable">Nastavi</Link>
        }
        </div>
    );
};

export default Homepage;