import React, { useContext, useState } from 'react';
import { AppContext } from '../_context/AppContext';

const Score = () => {
    const [isDropdownVisible, toggleDropdown] = useState(false)
    const { firstPlayerSign, secondPlayerSign, firstPlayersName, secondPlayersName, firstPlayersScore, secondPlayersScore } = useContext(AppContext)

    const generateFontColor = (playerSign) => {
        return playerSign === 'x' ? '#FE605D' : '#27AAE1'
    }

    const onClick = () => {
        const scoreDropdown = document.querySelector('.score-dropdown')
        isDropdownVisible ? 
        scoreDropdown.classList.remove('open')
        :scoreDropdown.classList.add('open')
        toggleDropdown(!isDropdownVisible)
    }

    return (
        <div className="score">
            <div className={`score-dropdown`}>
                <div className="dropdown-container">
                    <div className="player-score">
                        <h5 style={{ color: generateFontColor(firstPlayerSign) }}>{firstPlayersName}</h5>
                        <div>{firstPlayersScore}</div>
                    </div>
                    <div className="player-score">
                        <h5 style={{ color: generateFontColor(secondPlayerSign) }}>{secondPlayersName}</h5>
                        <div>{secondPlayersScore}</div>
                    </div>
                </div>
            <button className="score-btn btn" onClick={onClick}>Score</button>
            </div>
        </div>
    );
};

export default Score;