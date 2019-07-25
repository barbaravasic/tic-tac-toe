import Field from "../models/Field";

class GameFieldService {

    createGameField() {
        const fieldsIds = ['pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5', 'pos-6', 'pos-7', 'pos-8', 'pos-9']
        return fieldsIds.map(fieldId => new Field(fieldId))
    }
}

export const gameFieldService = new GameFieldService()