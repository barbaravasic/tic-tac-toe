import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import { AppContext } from '../_context/AppContext';

const Homepage = () => {

    const { setSign, isX } = useContext(AppContext)

    const onSetSign = (e) => {
        const clickedSign = e.currentTarget
        setSign(clickedSign.id)

        const signs = document.querySelectorAll('.sign')
        const arr = [...signs]
        arr.map(sign => sign.classList.remove('selected'))
        clickedSign.classList.add('selected')

    }

    return (
        <div className="homepage">
            <h2 className="title">Welcome to Tic Tac Toe game</h2>
            <h3 className="subtitle">Choose your sign</h3>
            <div className="sign-container">
                <div className="sign" id="sign-x" onClick={onSetSign}>
                    <img src="./images/x.png" alt="x sign" />
                </div>
                <div className="sign" id="sign-o" onClick={onSetSign}>
                    <img src="./images/o.png" alt="o sign" />
                </div>
            </div>
            <Link to="/play-game" className="continue-btn">Nastavi</Link>
        </div>
    );
};

export default Homepage;