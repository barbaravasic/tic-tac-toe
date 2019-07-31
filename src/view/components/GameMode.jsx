import React, {useContext} from 'react';
import { AppContext } from '../_context/AppContext';

const GameMode = () => {
    const {setGameMode, gameMode} = useContext(AppContext)

    const onSetGameMode = (e) => {
        const chosenMode = e.currentTarget
        setGameMode(chosenMode.id)
    }

    return (
        <div className="game-mode-container">
                <div className={`game-mode ${gameMode === 'single-player' && 'selected'}`} id="single-player" onClick={onSetGameMode}>
                    <img src="./images/single-player.png" alt="single player" />
                </div>
                <div className={`game-mode ${gameMode === 'two-players' && 'selected'}`} id="two-players" onClick={onSetGameMode}>
                    <img src="./images/two-players.png" alt="single player" />
                </div>
            </div>
    );
};

export default GameMode;