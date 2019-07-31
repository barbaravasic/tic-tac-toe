import React, {useContext} from 'react';
import { AppContext } from '../_context/AppContext';

const TwoPlayersInfo = () => {

    const { setSign, firstPlayersName, secondPlayersName, onChangePlayersName, firstPlayerSign } = useContext(AppContext)

    const onSetSign = (e) => {
        const clickedSign = e.currentTarget
        setSign(clickedSign.id)

        // const signs = document.querySelectorAll('.sign')
        // const arr = [...signs]
        // arr.map(sign => sign.classList.remove('selected'))
        // clickedSign.classList.add('selected')

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
                    <label>First Player's Name</label>
                </div>
                <div className="insert-name">
                    <input id="secondPlayersName" type="text" value={secondPlayersName} onChange={onChangeName} />
                    <label>Second Player's Name</label>
                </div>
            </div>
            <h3 className="subtitle">First to play chooses</h3>
            <div className="sign-container">
                <div className={`sign ${firstPlayerSign === 'x' && 'selected'}`} id="sign-x" onClick={onSetSign}>
                    <img src="./images/x.png" alt="x sign" />
                </div>
                <div className={`sign ${firstPlayerSign === 'o' && 'selected'}`} id="sign-o" onClick={onSetSign}>
                    <img src="./images/o.png" alt="o sign" />
                </div>
            </div>
        </>
    );
};

export default TwoPlayersInfo;