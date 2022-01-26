import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StatusBar, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../assets/colors/colors";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { HomeNavigationProps } from "../../navigation/NavigationTypes";
import { styles } from "./styles";

const HomeScreen = () => {

    const navigation = useNavigation<HomeNavigationProps>();

    return (
        <LinearGradient 
            colors={[Colors.LIGHT_BLUE_EXTREME, Colors.BLUE]}
            style={styles.screen}>
            <StatusBar backgroundColor={Colors.LIGHT_BLUE_EXTREME} />
            <View style={styles.container}>
                <Text 
                    text={'Luck Game'}
                    color={Colors.WHITE}
                    textAlign={'center'}
                    fontSize={40}
                    fontWeight={'bold'} />
                <View style={{height: 20}} />
                <Text 
                    text={'You think you are lucky?\nTry to do the impossible by winning 7 times in a row!'}
                    color={Colors.WHITE}
                    textAlign={'center'} />
            </View>
            <View style={styles.container}>
                <Button 
                    text={'Single Player'}
                    onPress={() => navigation.navigate('SelectStageScreen', {
                        Player: 'Single Player'
                    })} />
                <View style={{height: 20}} />
                <Button 
                    text={'Two Players'}
                    onPress={() => navigation.navigate('SelectStageScreen', {
                        Player: 'Two Players'
                    })} />
                <View style={{height: 60}} />
                <Button 
                    text={'Leadersboard'}
                    onPress={() => navigation.navigate('SelectStageScreen', {
                        Player: 'Two Players'
                    })}
                    backgroundColor={Colors.ORANGE} />
            </View>
            <View style={[styles.container, {paddingBottom: 40, flex: 1}]}>
                <Text 
                    text={'Created by ARHAX'}
                    color={Colors.WHITE}
                    textAlign={'center'}
                    fontSize={12} />
            </View>
        </LinearGradient>
    );
}

export default HomeScreen;