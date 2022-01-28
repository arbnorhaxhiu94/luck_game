import React from "react";
import { ActivityIndicator, ColorValue, View } from "react-native";
import { Colors } from "../../assets/colors/colors";
import Text from "../../components/Text";
import { styles } from "./styles";

interface LoadingViewProps {
    color?: ColorValue,
    text?: string
}

const LoadingView = ({
    color,
    text
}: LoadingViewProps) => {
    return (
        <View style={styles.screen}>
            <ActivityIndicator 
                color={color ? color : Colors.BLUE}
                size={30} />
            <Text 
                text={text}
                textAlign={'center'}
                color={color ? color : Colors.BLUE} />
        </View>
    )
}

export default LoadingView;