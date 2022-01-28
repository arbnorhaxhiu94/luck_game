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
// import firestore from '@react-native-firebase/firestore';

const LeadersboardScreen = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { getLeaders } = bindActionCreators(actionCreators, dispatch);

    const leadersState: GetLeadersStateType = useSelector((state: State) => state.getLeadersReducer);

    const leadersboardHeader: Leaders = {
        id: 'Position',
        username: 'Username',
        wins: 'Wins'
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
                backgroundColor={Colors.ORANGE_LIGHT} />
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
            <FlatList 
                bounces={false}
                data={leadersState.data}
                renderItem={({item, index}) => {
                    return (
                        <LeaderItem 
                            leader={item}
                            place={index} />
                    )
                }}
                keyExtractor={item => item.id} />}

            <EditUsernamePopup 
                visible={showEditPopup}
                closePopup={() => setShowEditPopup(false)} />
        </LinearGradient>
    )
}

export default LeadersboardScreen;