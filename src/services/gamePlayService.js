class GamePlayService {

     compareWithWinCombination = (positions, winCombo) => {
        return positions.filter(el => {
            return el === winCombo[0] || el === winCombo[1] || el === winCombo[2]
        })
    }

    createPlayersCombo = (playersPositions) => {
        const winCombination1 = [1, 4, 7]
        const winCombination2 = [2, 5, 8]
        const winCombination3 = [3, 6, 9]
        const winCombination4 = [1, 5, 9]
        const winCombination5 = [3, 5, 7]
        const winCombination6 = [1, 2, 3]
        const winCombination7 = [4, 5, 6]
        const winCombination8 = [7, 8, 9]

        return [
            this.compareWithWinCombination(playersPositions, winCombination1),
            this.compareWithWinCombination(playersPositions, winCombination2),
            this.compareWithWinCombination(playersPositions, winCombination3),
            this.compareWithWinCombination(playersPositions, winCombination4),
            this.compareWithWinCombination(playersPositions, winCombination5),
            this.compareWithWinCombination(playersPositions, winCombination6),
            this.compareWithWinCombination(playersPositions, winCombination7),
            this.compareWithWinCombination(playersPositions, winCombination8),
        ]
    }

    isWinningCombo(playersCombo) {
        return playersCombo.some(el => el.length === 3)
    }
}

export const gamePlayService = new GamePlayService()