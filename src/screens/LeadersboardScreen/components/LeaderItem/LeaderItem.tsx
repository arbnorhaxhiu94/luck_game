import React from "react";
import { ColorValue, Image, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../../../assets/colors/colors";
import Text from "../../../../components/Text";
import { Leaders } from "../../../../models/Leaders";
import { styles } from "./styles";

interface LeaderItemProps {
    leader: Leaders | null,
    place: number | string,
    backgroundColor?: string[],
    user?: boolean,
    orientation?: 'Vertical' | 'Horizontal'
}

const LeaderItem = ({
    leader,
    place,
    backgroundColor,
    user,
    orientation
}: LeaderItemProps) => {
    return (
        <LinearGradient 
            colors={user && backgroundColor ? 
                [backgroundColor[0], backgroundColor[1]] : 
                [Colors.TRANSPARENT, Colors.TRANSPARENT]}
            start={{ x: 0, y: 0 }} end={orientation == 'Vertical' ? { x: 0, y: 1 } : { x: 1, y: 0 }}
            style={[styles.container, {
                borderColor: leader?.wins == 7 ? Colors.ORANGE_LIGHT : Colors.WHITE,
                // backgroundColor: backgroundColor ? backgroundColor : Colors.TRANSPARENT
            }]}>
            <Text 
                text={typeof(place) == 'string' ? place : place+1}
                color={leader?.wins == 7 ? Colors.ORANGE_LIGHT : Colors.WHITE}
                fontWeight={'bold'}
                fontSize={16} />
            <Text 
                text={leader?.username}
                color={leader?.wins == 7 ? Colors.ORANGE_LIGHT : Colors.WHITE}
                fontWeight={'bold'}
                fontSize={16} />
            
            <View style={styles.winsContainer}>
                {leader?.wins == 7 ?
                <Image 
                    source={require('../../../../assets/images/trophy.png')}
                    style={styles.trophy} />
                :
                <Text 
                    text={leader?.wins}
                    color={Colors.WHITE}
                    fontWeight={'bold'}
                    fontSize={16} />}
            </View>
        </LinearGradient>
    )
}

export default LeaderItem;