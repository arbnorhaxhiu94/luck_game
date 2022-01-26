import { initialValuesType } from "./initialValues/type";

export const calculateUser1Step = (boxes: initialValuesType[]): { tempBoxes: initialValuesType[], diceNumber: number} => {
    let diceNumber = Math.floor(Math.random() * 6) + 1;
    let tempBoxes = boxes;
    let currentPosition: number = 0;

    tempBoxes.some(box => {
        if(box.value == 1) {
            currentPosition = tempBoxes.indexOf(box);
        }
    });

    if (currentPosition + diceNumber > tempBoxes.length - 1) {
        tempBoxes[tempBoxes.length - 1].value = 1
    } else {
        tempBoxes[currentPosition + diceNumber].value = 1;
    }

    tempBoxes[currentPosition].value = 0;

    return {tempBoxes, diceNumber};
}

export const calculateUser2Step = (boxes: initialValuesType[]): { tempBoxes: initialValuesType[], diceNumber: number} => {
    let diceNumber = Math.floor(Math.random() * 6) + 1;
    let tempBoxes = boxes;
    let currentPosition = 0;

    tempBoxes.some(box => {
        if(box.value == 2) {
            currentPosition = tempBoxes.indexOf(box);
        }
    });

    if (currentPosition == 0) {
        tempBoxes[tempBoxes.length - diceNumber].value = 2;
    } else {
        if (currentPosition - diceNumber < 0) {
            tempBoxes[0].value = 2
        } else {
            tempBoxes[currentPosition - diceNumber].value = 2;
        }
    }
    
    tempBoxes[currentPosition].value = 0;

    return {tempBoxes, diceNumber};
}