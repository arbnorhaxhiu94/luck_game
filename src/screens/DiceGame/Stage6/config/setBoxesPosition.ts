import { SCREEN } from "../../../../config/Constants"

export const boxLeftPosition = (boxId: number) : number => {

    if (boxId == 6 || boxId == 28) {
        return SCREEN.width / 16;
    }
    if (boxId == 7 || boxId == 27) {
        return SCREEN.width / 8;
    }
    if (boxId == 8 || boxId == 26) {
        return SCREEN.width / 5.2;
    }
    if (boxId == 9 || boxId == 25) {
        return SCREEN.width / 3.9;
    }
    if (boxId == 10 || boxId == 24) {
        return SCREEN.width / 3.15;
    }
    if (boxId == 11 || boxId == 23) {
        return SCREEN.width / 2.63;
    }
    if (boxId == 12 || boxId == 22) {
        return SCREEN.width / 2.24;
    }
    if (boxId == 13 || boxId == 21) {
        return SCREEN.width / 1.93;
    }
    if (boxId >= 14 && boxId <= 20) {
        return SCREEN.width / 1.71
    }

    return 0
}

export const boxTopPosition = (boxId: number) : number => {

    if (boxId == 6) {
        return -SCREEN.width/16;
    }
    if (boxId == 7) {
        return -SCREEN.width / 7.8;
    }
    if (boxId == 8) {
        return -SCREEN.width / 5.2;
    }
    if (boxId == 9) {
        return -SCREEN.width / 3.9;
    }
    if (boxId == 10) {
        return -SCREEN.width / 3.1;
    }
    if (boxId == 11) {
        return -SCREEN.width / 2.57;
    }
    if (boxId == 12) {
        return -SCREEN.width / 2.2;
    }
    if (boxId == 13) {
        return -SCREEN.width / 1.93;
    }
    if (boxId >= 14 && boxId <= 20) {
        return -SCREEN.width / 1.71;
    }
    if (boxId == 21) {
        return -SCREEN.width / 1.54
    }
    if (boxId == 22) {
        return -SCREEN.width / 1.4
    }
    if (boxId == 23) {
        return -SCREEN.width / 1.28
    }
    if (boxId == 24) {
        return -SCREEN.width / 1.18
    }
    if (boxId == 25) {
        return -SCREEN.width / 1.1
    }
    if (boxId == 26) {
        return -SCREEN.width / 1.025
    }
    if (boxId == 27) {
        return -SCREEN.width - 15
    }
    if (boxId == 28) {
        return -SCREEN.width - 40
    }
    if (boxId >= 29) {
        return -SCREEN.width - 65
    }

    return 0;
}
