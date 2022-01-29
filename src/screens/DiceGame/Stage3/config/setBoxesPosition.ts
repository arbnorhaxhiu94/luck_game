import { SCREEN } from "../../../../config/Constants"

export const boxLeftPosition = (boxId: number) : number => {

    if (boxId == 5) {
        return SCREEN.width / 16;
    }
    if (boxId == 6) {
        return SCREEN.width / 8;
    }
    if (boxId == 7) {
        return SCREEN.width / 5.2;
    }
    if (boxId == 8) {
        return SCREEN.width / 3.9;
    }
    if (boxId == 9) {
        return SCREEN.width / 3.15;
    }
    if (boxId == 10) {
        return SCREEN.width / 2.63;
    }
    if (boxId == 11) {
        return SCREEN.width / 2.24;
    }
    if (boxId >= 12) {
        return SCREEN.width / 1.93;
    }
    
    return 0
}

export const boxTopPosition = (boxId: number) : number => {

    return 0;
}