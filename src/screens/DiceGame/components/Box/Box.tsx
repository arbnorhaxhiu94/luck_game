import React from "react";
import { ColorValue, Image, Text, View } from "react-native";
import { SCREEN } from "../../../../config/Constants";
import { initialValuesType } from "../../calculations/initialValues/type";

interface BoxProps {
    box: initialValuesType,
    color: ColorValue,
    left: number,
    top: number
}

export const Box = ({
    box,
    color,
    left,
    top
}: BoxProps) => {
    return box.value == 1 ? (
        <Image 
            source={require('../../../../assets/images/woman.png')}
            style={{ 
                width: SCREEN.width/20 + 5, 
                height: SCREEN.width/20 + 5,
                alignSelf: 'center'
                // left: left,
                // top: top
            }} />
    ) : box.value == 2 ? (
        <Image 
            source={require('../../../../assets/images/man.png')}
            style={{ 
                width: SCREEN.width/20 + 5, 
                height: SCREEN.width/20 + 5,
                alignSelf: 'center'
                // left: left,
                // top: top
            }} />
    ) : (
        null
    );
}