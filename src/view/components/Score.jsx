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
        const arrow = document.querySelector('.arrow')
        if( isDropdownVisible) {
            scoreDropdown.classList.remove('open')
            arrow.classList.remove('arrow-up')
            arrow.classList.add('arrow-down')
        } else {
            scoreDropdown.classList.add('open')
            arrow.classList.remove('arrow-down')
            arrow.classList.add('arrow-up')
        }

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
            <button className="score-btn btn" onClick={onClick}>Score <i className="arrow arrow-down"></i></button>
            </div>
        </div>
    );
};

export default Score;