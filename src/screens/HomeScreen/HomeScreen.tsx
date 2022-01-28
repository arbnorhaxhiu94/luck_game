import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../assets/colors/colors";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { HomeNavigationProps } from "../../navigation/NavigationTypes";
import { styles } from "./styles";
import DeviceInfo from 'react-native-device-info'
import { useDispatch, useSelector } from "react-redux";
import { UserStateType } from "../../redux/reducers/User/UserReducer";
import { actionCreators, State } from "../../redux";
import { bindActionCreators } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {

    const navigation = useNavigation<HomeNavigationProps>();
    const dispatch = useDispatch();
    const { setUserData } = bindActionCreators(actionCreators, dispatch);

    const userState: UserStateType = useSelector((state: State) => state.userReducer);

    useEffect(() => {
        console.log(DeviceInfo.getUniqueId());
        let uniqueId = DeviceInfo.getUniqueId();
        let username = 'user_'+uniqueId.substring(0,8);
        console.log(username);

        console.log('USER1: '+userState.user);
        if (userState.user == null) {
            setUserData({
                id: username,
                username: username,
                wins: 0
            });
        }
    }, []);

    useEffect(() => {
        if (userState.user) {
            console.log('USER DATA = '+userState.user);
        }
    }, [userState.user]);

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
                    onPress={() => navigation.navigate('LeadersboardScreen')}
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