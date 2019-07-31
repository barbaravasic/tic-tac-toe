import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import AppStore from './view/AppStore';
import App from './view/App';
import * as serviceWorker from './serviceWorker';

import './index.css';
ReactDOM.render(
    <HashRouter>
        <AppStore>
            <App />
        </AppStore>
    </HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
