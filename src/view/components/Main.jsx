import React from 'react';
import { Route } from 'react-router-dom'
import Homepage from '../pages/Homepage';
import GamePage from '../pages/GamePage';
import PlayerInfo from '../pages/PlayerInfo';

const Main = () => {
    return (
        <main className="main">
            <Route path="/player-info" component={PlayerInfo} />
            <Route path="/play-game" component={GamePage} />
            <Route exact path="/" component={Homepage} />
        </main>
    );
};

export default Main;