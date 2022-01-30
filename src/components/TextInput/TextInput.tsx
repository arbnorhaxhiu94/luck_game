import React from "react";
import { TextInput } from "react-native";
import { Colors } from "../../assets/colors/colors";
import { styles } from "./styles";

interface CustomTextInputProps {
    placeholder: string,
    value: string,
    onChangeText(text: string): void
}

const CustomTextInput = ({
    placeholder,
    value,
    onChangeText
}: CustomTextInputProps) => {
    return (
        <TextInput 
            style={styles.textinput}
            placeholder={placeholder}
            placeholderTextColor={Colors.GRAY_A}
            value={value}
            onChangeText={(text: string) => onChangeText(text)}
            maxLength={20} />
    )
}

export default CustomTextInput;