import React, { useContext } from 'react';
import { AppContext } from '../_context/AppContext';

const GameField = ({ firstPlayersTurn, onSelectField, field, isGameOver }) => {
    const { firstPlayerSign, secondPlayerSign, setFirstPlayersPositions, setSecondPlayersPositions} = useContext(AppContext)

    const onSelect = (e) => {
        field.setSelected()
        const fieldId = field.position
        var position = parseInt(fieldId.match(/\d/g).join(''))
        
        const isSelected = e.currentTarget.classList.contains('selected')
        
        if (firstPlayersTurn && !isSelected && !isGameOver) {
            field.setSign(firstPlayerSign)
            onSelectField()
            setFirstPlayersPositions(position)
        } else if(!isSelected && !isGameOver){
            field.setSign(secondPlayerSign)
            onSelectField()
            setSecondPlayersPositions(position)
        }   
    }


    return (
        <div className={`game-field ${field.selected ? 'selected' : ''}`} onClick={onSelect}>
            <img className={field.sign} src={`/images/${field.sign}.png`} alt={field.sign} />
        </div>
    );
};

export default GameField;