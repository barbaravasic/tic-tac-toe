import React, { useContext } from 'react';
import { AppContext } from '../_context/AppContext';
import { gamePlayService } from '../../services/gamePlayService';

const GameField = ({ firstPlayersTurn, onSelectField, field, isGameOver, onComputerSelectFiled }) => {
    const { firstPlayerSign, secondPlayerSign, setPlayersPositions, gameMode, firstPlayersPositions, secondPlayersPositions} = useContext(AppContext)

    const onSelect = (e) => {
        field.setSelected()
        const fieldId = field.position
        var position = parseInt(fieldId.match(/\d/g).join(''))
        
        const isSelected = e.currentTarget.classList.contains('selected')
        if(gameMode === 'two-players') {
            twoPlayersMode(position, isSelected)
        } else if(gameMode === 'single-player') {
            const computersPosition = gamePlayService.chooseComputerPosition([...firstPlayersPositions, position], secondPlayersPositions)
            singlePlayerMode(position, isSelected, computersPosition)
        }
        
    }

    const singlePlayerMode = (position, isSelected, computersPosition) => {
        if (firstPlayersTurn && !isSelected && !isGameOver) {
            field.setSign(firstPlayerSign)
            setPlayersPositions(position, true)
            setTimeout(function(){
                onComputerSelectFiled(computersPosition)
            }, 1000)
        }  
    }

    const twoPlayersMode = (position, isSelected) => {
        if (firstPlayersTurn && !isSelected && !isGameOver) {
            field.setSign(firstPlayerSign)
            onSelectField()
            setPlayersPositions(position, true)
        } else if(!isSelected && !isGameOver){
            field.setSign(secondPlayerSign)
            onSelectField()
            setPlayersPositions(position)
        }   
    }

    return (
        <div className={`game-field ${field.selected ? 'selected' : ''}`} id={field.position} onClick={onSelect}>
            <img className={field.sign} src={`/images/${field.sign}.png`} alt={field.sign} />
        </div>
    );
};

export default GameField;