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
                    text={'Test your luck by playing a game \nthat is based on luck only'}
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
            </View>
            <View style={[styles.container, {paddingBottom: 40}]}>
                <Text 
                    text={'Created by ARHAX'}
                    color={Colors.WHITE}
                    textAlign={'center'} />
            </View>
        </LinearGradient>
    );
}

export default HomeScreen;