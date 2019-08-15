import React, { useContext, useEffect } from 'react';
import { AppContext } from '../_context/AppContext';
import { gamePlayService } from '../../services/gamePlayService';

const GameField = ({ firstPlayersTurn, onSelectField, field, isGameOver, onComputerSelectFiled, computerInitialPosition }) => {
    const { firstPlayerSign, secondPlayerSign, setPlayersPositions, gameMode, firstPlayersPositions, secondPlayersPositions } = useContext(AppContext)

    // useEffect(() => {
    //     if (computerInitialPosition === field.position) {
    //         onComputerSelectFiled(computerInitialPosition)

    //     }
    // }, [computerInitialPosition, field.position, onComputerSelectFiled])

    const onSelect = (e) => {
        field.setSelected()
        const fieldId = field.position
        var position = parseInt(fieldId.match(/\d/g).join(''))

        const isSelected = e.currentTarget.classList.contains('selected')
        if (gameMode === 'two-players') {
            twoPlayersMode(position, isSelected)
        } else if (gameMode === 'single-player') {
            singlePlayerMode(position, isSelected)
        }

    }

    const singlePlayerMode = (position, isSelected) => {
        if (firstPlayersTurn && !isSelected && !isGameOver) {
            const computersPosition = gamePlayService.chooseComputerPositionHard([...firstPlayersPositions, position], secondPlayersPositions)
            field.setSign(firstPlayerSign)
            setPlayersPositions(position, true)
            onSelectField()
            setTimeout(function () {
                onComputerSelectFiled(computersPosition)
            }, 1000)
        }
    }
    const twoPlayersMode = (position, isSelected) => {
        console.log(firstPlayerSign);
        if (firstPlayersTurn && !isSelected && !isGameOver) {
            field.setSign(firstPlayerSign)
            onSelectField()
            setPlayersPositions(position, true)
        } else if (!isSelected && !isGameOver) {
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