import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../assets/colors/colors";
import Header from "../../components/Header";
import { Leaders } from "../../models/Leaders";
import EditUsernamePopup from "./components/EditUsernamePopup/EditUsernamePopup";
import LeaderItem from "./components/LeaderItem/LeaderItem";
import { leaders } from "./mockData";
import { styles } from "./styles";

const LeadersboardScreen = () => {

    const navigation = useNavigation();

    const leadersboardHeader: Leaders = {
        id: 'Position',
        username: 'Username',
        wins: 'Wins'
    }

    const [ leadersState, setLeadersState ] = useState<Leaders[] | null>(null);
    const [ showEditPopup, setShowEditPopup ] = useState<boolean>(false);

    useEffect(() => {
        leaders.sort((a, b) => {
            if (typeof(b.wins) == 'number' && typeof(a.wins) == 'number') {
                return b.wins - a.wins
            }
            return 0;
        });
        setLeadersState(leaders);
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
            {leadersState &&
            <FlatList 
                bounces={false}
                data={leadersState}
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