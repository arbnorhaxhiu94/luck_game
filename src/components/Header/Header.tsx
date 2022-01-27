import React from "react";
import { ColorValue, Image, TouchableOpacity, View } from "react-native";
import Text from "../Text";
import { styles } from "./styles";

interface HeaderProps {
    title: string | undefined,
    titleTextColor?: ColorValue,
    goBack?(): void,
    edit?(): void
}

const Header = ({
    title,
    titleTextColor,
    goBack,
    edit
}: HeaderProps) => {
    return (
        <View style={styles.container}>

            {goBack ? 
            <TouchableOpacity 
                style={styles.backButton}
                onPress={goBack} >
                <Image 
                    source={require('../../assets/images/back.png')}
                    style={{width: 40, height: 40}} />
            </TouchableOpacity> : null}

            <Text 
                text={title}
                color={titleTextColor}
                fontSize={20}
                fontWeight={'bold'} />

            {edit ? 
            <TouchableOpacity 
                style={styles.editButton}
                onPress={edit} >
                <Image 
                    source={require('../../assets/images/ic_edit.png')}
                    style={{width: 40, height: 40}} />
            </TouchableOpacity> : null}
        </View>
    )
}

export default Header;