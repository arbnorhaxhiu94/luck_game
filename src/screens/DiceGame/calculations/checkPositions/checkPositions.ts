import { initialValuesType } from "../initialValues/type";

export const hasSteppedOnTheEnemy = (
    tempBoxes: initialValuesType[],
    playerTurn: 'Player1' | 'Player2',
    player1Position: number,
    player2Position: number,
    player1Soldiers: number,
    player2Soldiers: number,
    result: number[]
): { 
    newTempBoxes1: initialValuesType[], 
    stepped: boolean, 
    finished1?: boolean,
    result1?: number[],
    player1Soldiers1?: number,
    player2Soldiers1?: number
} => {
    if (playerTurn == 'Player2' && player1Position == -1) {
        player1Soldiers = player1Soldiers - 1;
        if (player1Soldiers == 0) {
            result = [result[0], result[1] + 1];
            return {
                newTempBoxes1: tempBoxes, 
                stepped: true,
                finished1: true,
                result1: result,
                player1Soldiers1: player1Soldiers,
                player2Soldiers1: player2Soldiers
            };
        }
        tempBoxes[0].value = 1;
        return {
            newTempBoxes1: tempBoxes, 
            stepped: true,
            player1Soldiers1: player1Soldiers,
            player2Soldiers1: player2Soldiers
        };
    }
    if (playerTurn == 'Player1' && player2Position == -1) {
        player2Soldiers = player2Soldiers - 1;
        if (player2Soldiers == 0) {
            result = [result[0] + 1, result[1]];
            return {
                newTempBoxes1: tempBoxes, 
                stepped: true,
                finished1: true,
                result1: result,
                player1Soldiers1: player1Soldiers,
                player2Soldiers1: player2Soldiers
            };
        }
        tempBoxes[tempBoxes.length - 1].value = 2;
        return {
            newTempBoxes1: tempBoxes, 
            stepped: true,
            player1Soldiers1: player1Soldiers,
            player2Soldiers1: player2Soldiers
        };
    }
    return {
        newTempBoxes1: tempBoxes, 
        stepped: false
    };
}

export const hasPassedOverTheEnemy = (
    tempBoxes: initialValuesType[],
    playerTurn: 'Player1' | 'Player2',
    player1Position: number,
    player2Position: number,
    result: number[],
    player1Soldiers: number,
    player2Soldiers: number
): { 
    newTempBoxes2: initialValuesType[], 
    passedOver: boolean, 
    finished2?: boolean,
    result2?: number[],
    player1Soldiers2?: number,
    player2Soldiers2?: number
} => {
    if (playerTurn == 'Player1' && (player1Position >= player2Position)) {
        tempBoxes[player2Position].value = 0;
        player2Soldiers = player2Soldiers - 1;
        if (player2Soldiers == 0) {
            result = [result[0] + 1, result[1]];
            return {
                newTempBoxes2: tempBoxes, 
                passedOver: true,
                finished2: true,
                result2: result,
                player1Soldiers2: player1Soldiers,
                player2Soldiers2: player2Soldiers
            };
        }
        tempBoxes[tempBoxes.length - 1].value = 2;
        return {
            newTempBoxes2: tempBoxes, 
            passedOver: true,
            player1Soldiers2: player1Soldiers,
            player2Soldiers2: player2Soldiers
        };
    }
    if (playerTurn == 'Player2' && (player2Position <= player1Position)) {
        console.log('Player 1 down')
        console.log('Player 1 Soldiers: '+player1Soldiers);
        tempBoxes[player1Position].value = 0;
        player1Soldiers = player1Soldiers - 1;
        if (player1Soldiers == 0) {
            result = [result[0], result[1] + 1];
            return {
                newTempBoxes2: tempBoxes, 
                passedOver: true,
                finished2: true,
                result2: result,
                player1Soldiers2: player1Soldiers,
                player2Soldiers2: player2Soldiers
            };
        }
        tempBoxes[0].value = 1;
        return {
            newTempBoxes2: tempBoxes, 
            passedOver: true,
            player1Soldiers2: player1Soldiers,
            player2Soldiers2: player2Soldiers
        };
    }
    return {
        newTempBoxes2: tempBoxes, 
        passedOver: false
    };
}

export const hasReachedTheEnemyBase = (
    tempBoxes: initialValuesType[],
    playerTurn: 'Player1' | 'Player2',
    player1Position: number,
    player2Position: number,
    result: number[],
): { 
    newTempBoxes3: initialValuesType[], 
    finished3: boolean,
    result3?: number[],
} => {
    if (playerTurn == 'Player1' && player1Position >= tempBoxes.length - 1) {
        tempBoxes[tempBoxes.length - 1].value = 1;
        tempBoxes[player2Position].value = 0;
        result = [result[0] + 1, result[1]];
        return {
            newTempBoxes3: tempBoxes, 
            finished3: true,
            result3: result
        };
    } else if (playerTurn == 'Player2' && player2Position <= 0) {
        tempBoxes[0].value = 2;
        tempBoxes[player1Position].value = 0;
        result = [result[0], result[1] + 1];
        return {
            newTempBoxes3: tempBoxes, 
            finished3: true,
            result3: result
        };
    }
    return {
        newTempBoxes3: tempBoxes, 
        finished3: false
    };
}