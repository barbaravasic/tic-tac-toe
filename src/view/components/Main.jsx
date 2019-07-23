import React from 'react';
import { Route } from 'react-router-dom'
import Homepage from '../pages/Homepage';
import GamePage from '../pages/GamePage';

const Main = () => {
    return (
        <main className="main">
            <Route path="/play-game" component={GamePage} />
            <Route exact path="/" component={Homepage} />
        </main>
    );
};

export default Main;