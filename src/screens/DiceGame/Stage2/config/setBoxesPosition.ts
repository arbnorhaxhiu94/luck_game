import { SCREEN } from "../../../../config/Constants"

export const boxLeftPosition = (boxId: number) : number => {

    if (boxId == 6) {
        return SCREEN.width / 20;
    }
    if (boxId == 7) {
        return SCREEN.width / 10;
    }
    if (boxId == 8) {
        return SCREEN.width / 6.65;
    }
    if (boxId >= 9 && boxId <= 19) {
        return SCREEN.width / 5;
    }
    if (boxId == 20) {
        return SCREEN.width / 4;
    }
    if (boxId == 21) {
        return SCREEN.width / 3.33;
    }
    if (boxId == 22) {
        return SCREEN.width / 2.86;
    }
    if (boxId >= 23 && boxId <= 28) {
        return SCREEN.width / 2.51;
    }

    return 0
}

export const boxTopPosition = (boxId: number) : number => {

    if (boxId == 6) {
        return -SCREEN.width/20;
    }
    if (boxId == 7) {
        return -SCREEN.width / 10;
    }
    if (boxId == 8) {
        return -SCREEN.width / 6.65;
    }
    if (boxId >= 9 && boxId <= 19) {
        return -SCREEN.width / 5;
    }
    if (boxId == 20) {
        return -SCREEN.width / 4;
    }
    if (boxId == 21) {
        return -SCREEN.width / 3.33;
    }
    if (boxId == 22) {
        return -SCREEN.width / 2.86;
    }
    if (boxId >= 23 && boxId <= 28) {
        return -SCREEN.width / 2.5;
    }

    return 0;
}