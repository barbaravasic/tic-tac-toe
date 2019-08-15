class GamePlayService {

    constructor() {
        this.winCombination1 = [1, 4, 7]
        this.winCombination2 = [2, 5, 8]
        this.winCombination3 = [3, 6, 9]
        this.winCombination4 = [1, 5, 9]
        this.winCombination5 = [3, 5, 7]
        this.winCombination6 = [1, 2, 3]
        this.winCombination7 = [4, 5, 6]
        this.winCombination8 = [7, 8, 9]

        this.combinations = [this.winCombination1, this.winCombination2, this.winCombination3, this.winCombination4, this.winCombination5, this.winCombination6, this.winCombination7, this.winCombination8]
    }

    compareWithWinCombination = (positions, winCombo) => {
        return positions.filter(el => {
            return el === winCombo[0] || el === winCombo[1] || el === winCombo[2]
        })
    }


    createPlayersCombo = (playersPositions) => {

        return [
            this.compareWithWinCombination(playersPositions, this.winCombination1),
            this.compareWithWinCombination(playersPositions, this.winCombination2),
            this.compareWithWinCombination(playersPositions, this.winCombination3),
            this.compareWithWinCombination(playersPositions, this.winCombination4),
            this.compareWithWinCombination(playersPositions, this.winCombination5),
            this.compareWithWinCombination(playersPositions, this.winCombination6),
            this.compareWithWinCombination(playersPositions, this.winCombination7),
            this.compareWithWinCombination(playersPositions, this.winCombination8),
        ]
    }

    possibleWinningCombo(positions, takenPositions) {

        const combos = this.combinations.filter(winCombo => {
            return winCombo.some(el => positions.includes(el))
        })

        return combos.filter(combo => {
            const winCombo = combo.filter(item => !positions.includes(item))
            return winCombo.length === 1
        }).flat().filter(el => !takenPositions.includes(el))
    }

    computerPrioritizedPositions(takenPositions) {
        const possibleCombinations = this.combinations.filter(el => el.some(item => takenPositions.includes(item)))

        const availablePositions = possibleCombinations.flat().filter(el => !takenPositions.includes(el))

        return [...new Set(availablePositions)].filter(item => !takenPositions.includes(item))
    }

    createComputersCombo = (playersPositions, computerPositions) => {

        const takenPositions = [...playersPositions, ...computerPositions]

        const computerWinPositions = this.possibleWinningCombo(computerPositions, takenPositions)

        const playerWinPositions = this.possibleWinningCombo(playersPositions, takenPositions)
       
        switch (true) {
            case (computerWinPositions.length > 0):
                return computerWinPositions
            case (playerWinPositions.length > 0):
                return playerWinPositions
            default:
                return this.computerPrioritizedPositions(takenPositions)
        }
    }

    isWinningCombo(playersCombo) {
        return playersCombo.some(el => el.length === 3)
    }

    chooseComputerPositionEasy(firstPlayersPositions, secondPlayersPositions) {
        const allPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        const takenPositions = [...firstPlayersPositions, ...secondPlayersPositions]

        const availablePositions = allPositions.filter(el => {
            return !takenPositions.includes(el)
        })

        const index = Math.floor(Math.random() * (availablePositions.length - 0 + 0)) + 0
        return availablePositions[index]
    }

    randomPosition() {
        const allPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        const index = Math.floor(Math.random() * (allPositions.length - 0 + 0)) + 0
        return allPositions[index]
    }

    chooseComputerPositionHard(firstPlayersPositions, computerPositions) {

        const prioritizedPositions = this.createComputersCombo(firstPlayersPositions, computerPositions)

        const index = Math.floor(Math.random() * (prioritizedPositions.length - 0 + 0)) + 0

        return prioritizedPositions[index]

    }

}

export const gamePlayService = new GamePlayService()