import React, {useContext} from 'react';
import { AppContext } from '../_context/AppContext';

const SinglePlayerInfo = () => {

    const { setSign, firstPlayersName, secondPlayersName, onChangePlayersName } = useContext(AppContext)

    const onSetSign = (e) => {
        const clickedSign = e.currentTarget
        setSign(clickedSign.id)

        const signs = document.querySelectorAll('.sign')
        const arr = [...signs]
        arr.map(sign => sign.classList.remove('selected'))
        clickedSign.classList.add('selected')

    }

    const onChangeName = (e) => {
        const inputId = e.currentTarget.id
        const value = e.currentTarget.value

        onChangePlayersName(inputId, value)
    }

    return (
        <>
            <div className="insert-names">
                <div className="insert-name">
                    <input id="firstPlayersName" type="text" value={firstPlayersName} onChange={onChangeName} />
                    <label>Enter your name</label>
                </div>
            </div>
            {/* <h3 className="subtitle">Choose your sign</h3> */}
            {/* <div className="sign-container">
                <div className="sign" id="sign-x" onClick={onSetSign}>
                    <img src="./images/x.png" alt="x sign" />
                </div>
                <div className="sign" id="sign-o" onClick={onSetSign}>
                    <img src="./images/o.png" alt="o sign" />
                </div>
            </div> */}
        </>
    );
};

export default SinglePlayerInfo;