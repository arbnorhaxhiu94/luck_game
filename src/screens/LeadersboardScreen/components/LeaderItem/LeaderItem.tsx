import React from "react";
import { ColorValue, Image, View } from "react-native";
import { Colors } from "../../../../assets/colors/colors";
import Text from "../../../../components/Text";
import { Leaders } from "../../../../models/Leaders";
import { styles } from "./styles";

interface LeaderItemProps {
    leader: Leaders,
    place: number | string,
    backgroundColor?: ColorValue
}

const LeaderItem = ({
    leader,
    place,
    backgroundColor
}: LeaderItemProps) => {
    return (
        <View style={[styles.container, {
            borderColor: leader.wins == 7 ? Colors.ORANGE_LIGHT : Colors.WHITE,
            backgroundColor: backgroundColor ? backgroundColor : Colors.TRANSPARENT
        }]}>
            <Text 
                text={typeof(place) == 'string' ? place : place+1}
                color={leader.wins == 7 ? Colors.ORANGE_LIGHT : Colors.WHITE}
                fontWeight={'bold'}
                fontSize={16} />
            <Text 
                text={leader.username}
                color={leader.wins == 7 ? Colors.ORANGE_LIGHT : Colors.WHITE}
                fontWeight={'bold'}
                fontSize={16} />
            
            <View style={styles.winsContainer}>
                {leader.wins == 7 ?
                <Image 
                    source={require('../../../../assets/images/trophy.png')}
                    style={styles.trophy} />
                :
                <Text 
                    text={leader.wins}
                    color={Colors.WHITE}
                    fontWeight={'bold'}
                    fontSize={16} />}
            </View>
        </View>
    )
}

export default LeaderItem;