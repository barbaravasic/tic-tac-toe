import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AppContext } from '../_context/AppContext';
import SinglePlayerInfo from '../components/SinglePlayerInfo';
import TwoPlayersInfo from '../components/TwoPlayersInfo';

const PlayerInfo = () => {
    const { gameMode } = useContext(AppContext)
    return (
        <div>
            <h2 className="title">Welcome to Tic Tac Toe game</h2>
            {gameMode === 'single-player' ?
                <SinglePlayerInfo />
                : <TwoPlayersInfo />}
            <Link to="/play-game" className="btn">Nastavi</Link>
            }
        </div>
    );
};

export default PlayerInfo;