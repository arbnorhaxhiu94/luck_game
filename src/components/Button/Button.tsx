import React from "react";
import { ColorValue, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/colors/colors";
import { styles } from "./styles";

interface ButtonProps {
    onPress(): void,
    text: string,
    textColor?: ColorValue,
    width?: string | number,
    backgroundColor?: ColorValue,
    borderRadius?: number[]
}

const Button = ({
    onPress,
    text,
    textColor,
    width,
    backgroundColor,
    borderRadius
}: ButtonProps) => {
    return (
        <View style={[styles.container, {
            width: width ? width : '90%',
            borderTopRightRadius: borderRadius ? borderRadius[0] : 10,
            borderTopLeftRadius: borderRadius ? borderRadius[3] : 10,
            borderBottomRightRadius: borderRadius ? borderRadius[1] : 10,
            borderBottomLeftRadius: borderRadius ? borderRadius[2] : 10,
            backgroundColor: backgroundColor ? backgroundColor : Colors.DARK_BLUE
        }]}>
            <TouchableOpacity 
                style={styles.button}
                onPress={onPress} >
                <Text style={[styles.buttonText, {
                    color: textColor ? textColor : Colors.WHITE
                }]}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button;