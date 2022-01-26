import React from "react";
import { ColorValue, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../../../assets/colors/colors";
import { styles } from "./styles";

interface RollButtonProps {
    disabled: boolean,
    backgroundColor: ColorValue,
    onPress(): void
}

export const RollButton = ({
    disabled,
    backgroundColor,
    onPress
}: RollButtonProps) => {
    return (
        <TouchableOpacity 
            disabled={disabled}
            onPress={onPress}
            style={[styles.rollButton, {
                backgroundColor: backgroundColor,
                borderColor: disabled ? Colors.GRAY_C : Colors.WHITE,
            }]} >
            <Text style={styles.rollButtonText}>Roll</Text>
        </TouchableOpacity>
    )
}