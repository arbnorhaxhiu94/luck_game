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
import firestore from '@react-native-firebase/firestore';

const LeadersboardScreen = () => {

    const navigation = useNavigation();

    const leadersboardHeader: Leaders = {
        id: 'Position',
        username: 'Username',
        wins: 'Wins'
    }

    const [ leadersState, setLeadersState ] = useState<Leaders[] | null>(null);
    const [ showEditPopup, setShowEditPopup ] = useState<boolean>(false);

    const getLeaders = async() => {
        let leaders: Leaders[] = [];

        await firestore()
            .collection('Leaders')
            .orderBy('wins', 'desc')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
            
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    console.log(typeof(documentSnapshot.data().id))
                    let leader: Leaders = {
                        id: documentSnapshot.data()?.id,
                        username: documentSnapshot.data()?.username,
                        wins: documentSnapshot.data()?.wins
                    }
                    leaders.push(leader);
                });
            });
        setLeadersState(leaders);
    }

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