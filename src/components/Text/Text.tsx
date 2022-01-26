import React from "react";
import { ColorValue, Text } from "react-native";
import { Colors } from "../../assets/colors/colors";
import { styles } from "./styles";

interface TextProps {
    text: string | number | undefined,
    textAlign?: "center" | "auto" | "left" | "right" | "justify",
    color?: ColorValue,
    fontSize?: number,
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
}

const CustomText = ({
    text,
    color,
    fontSize,
    fontWeight,
    textAlign
}: TextProps) => {
    return (
        <Text style={[styles.text, {
            color: color ? color : Colors.BLACK,
            fontSize: fontSize ? fontSize : 14,
            fontWeight: fontWeight ? fontWeight : 'normal',
            textAlign: textAlign ? textAlign : 'left'
        }]}>
            {text}
        </Text>
    )
}

export default CustomText;