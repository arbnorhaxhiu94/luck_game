import React from "react";
import { Image, View } from "react-native";
import { styles } from "./styles";

interface SoldiersContainerProps {
    left: number,
    soldiers: number,
    player: 'Player1' | 'Player2'
}

export const SoldiersContainer = ({
    left,
    soldiers,
    player
}: SoldiersContainerProps) => {
    return player == 'Player1' ? (
        <View style={[styles.soldiersContainer, {
            left: left
        }]}>
            {soldiers - 1 >= 1 && 
                <Image 
                    source={require('../../../../assets/images/woman.png')}
                    style={styles.image} />}
            {soldiers - 1 >= 2 && 
                <Image 
                    source={require('../../../../assets/images/woman.png')}
                    style={styles.image} />}
        </View>
    ) : (
        <View style={[styles.soldiersContainer, {
            left: left
        }]}>
            {soldiers - 1 >= 1 && 
                <Image 
                    source={require('../../../../assets/images/man.png')}
                    style={styles.image} />}
            {soldiers - 1 >= 2 && 
                <Image 
                    source={require('../../../../assets/images/man.png')}
                    style={styles.image} />}
        </View>
    )
}