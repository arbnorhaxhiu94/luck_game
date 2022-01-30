import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Colors } from "../../assets/colors/colors";
import Header from "../../components/Header";
import Text from "../../components/Text";
import { Leaders } from "../../models/Leaders";
import { actionCreators, State } from "../../redux";
import { GetLeadersStateType } from "../../redux/reducers/GetLeaders/GetLeadersReducer";
import { UserStateType } from "../../redux/reducers/User/UserReducer";
import LoadingView from "../LoadingView";
import EditUsernamePopup from "./components/EditUsernamePopup/EditUsernamePopup";
import LeaderItem from "./components/LeaderItem/LeaderItem";
import { styles } from "./styles";

const LeadersboardScreen = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { getLeaders } = bindActionCreators(actionCreators, dispatch);

    const leadersState: GetLeadersStateType = useSelector((state: State) => state.getLeadersReducer);
    const userState: UserStateType = useSelector((state: State) => state.userReducer);

    const leadersboardHeader: Leaders = {
        id: 'Position',
        username: 'Username',
        wins: 'Wins'
    }

    let userPosition: Leaders | null = null;

    if (userState.user) {
        userPosition = {
            id: userState.user?.id,
            username: userState.user?.username,
            wins: userState.user?.wins
        }
    }

    const [ showEditPopup, setShowEditPopup ] = useState<boolean>(false);

    useEffect(() => {
        getLeaders();
    }, []);

    return (
        <LinearGradient 
            colors={[Colors.LIGHT_BLUE_EXTREME, Colors.BLUE]}
            style={styles.screen}>
            <StatusBar backgroundColor={Colors.LIGHT_BLUE_EXTREME} />
            <Header 
                title={'Leadersboard'}
                titleTextColor={Colors.WHITE}
                goBack={() => navigation.goBack()}
                edit={() => setShowEditPopup(true)} />
            <View style={{height: 20}} />
            <LeaderItem 
                leader={leadersboardHeader}
                place={'#'}
                orientation={'Vertical'}
                user
                backgroundColor={[Colors.DARK_BLUE, Colors.LIGHT_BLUE]} />
            {leadersState.loading ?
            <LoadingView 
                color={Colors.WHITE}
                text={'Loading...'} />
            :
            leadersState.error ? 
            <Text 
                text={leadersState.error}
                textAlign={'center'}
                color={Colors.ORANGE}
                fontSize={14} />
            : leadersState.data &&
            <>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    data={leadersState.data}
                    renderItem={({item, index}) => {
                        return (
                            <LeaderItem 
                                leader={item}
                                place={index}
                                user={item.id == userState.user?.id}
                                orientation={'Vertical'}
                                backgroundColor={item.id == userState.user?.id ? 
                                                [Colors.ORANGE_LIGHT, Colors.RED] :
                                                [Colors.TRANSPARENT, Colors.TRANSPARENT]} />
                        )
                    }}
                    keyExtractor={item => item.id} />
                <View style={styles.footer}>
                    {leadersState.data.some(leader => leader.id === userState.user?.id) ?
                        <Text 
                            text={'Congratulations! \nYou are on the leadersboard.'}
                            textAlign={'center'}
                            color={Colors.ORANGE_LIGHT}
                            fontSize={16}
                            fontWeight={'bold'} />
                    :
                        <LeaderItem 
                            leader={userPosition}
                            place={'+20'}
                            backgroundColor={[Colors.GRAY_A, Colors.GRAY_A]} />}
                    <View style={{height: 40}} />
                </View>
            </>}
            
            {showEditPopup ? 
                <EditUsernamePopup 
                    closePopup={() => setShowEditPopup(false)} /> : null}
        </LinearGradient>
    )
}

export default LeadersboardScreen;