import React from "react";
import { TextInput } from "react-native";
import { styles } from "./styles";

interface CustomTextInputProps {
    placeholder: string,
    onChangeText(text: string): void
}

const CustomTextInput = ({
    placeholder,
    onChangeText
}: CustomTextInputProps) => {
    return (
        <TextInput 
            style={styles.textinput}
            placeholder={placeholder}
            onChangeText={(text: string) => onChangeText(text)}
            maxLength={20} />
    )
}

export default CustomTextInput;