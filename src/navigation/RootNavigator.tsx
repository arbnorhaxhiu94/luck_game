import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SelectStageScreen from "../screens/SelectStageScreen";
import Stage2 from "../screens/DiceGame/Stage2/Stage2";
import Stage1 from "../screens/DiceGame/Stage1/Stage1";
import Stage3 from "../screens/DiceGame/Stage3/Stage3";
import Stage4 from "../screens/DiceGame/Stage4/Stage4";
import Stage5 from "../screens/DiceGame/Stage5/Stage5";

export type RootStackParamsList = {
    HomeScreen: undefined,
    SelectStageScreen: {
        Player: 'Single Player' | 'Two Players'
    },
    Stage1: {
        Player: 'Single Player' | 'Two Players' | undefined
    },
    Stage2: {
        Player: 'Single Player' | 'Two Players' | undefined
    },
    Stage3: {
        Player: 'Single Player' | 'Two Players' | undefined
    },
    Stage4: {
        Player: 'Single Player' | 'Two Players' | undefined
    },
    Stage5: {
        Player: 'Single Player' | 'Two Players' | undefined
    }
}

const RootStack = createNativeStackNavigator<RootStackParamsList>();

export const RootNavigator = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{
                headerShown: false,
                animation: 'slide_from_right'
            }}>
                <RootStack.Screen name={'HomeScreen'} component={HomeScreen} />
                <RootStack.Screen name={'SelectStageScreen'} component={SelectStageScreen} />
                <RootStack.Screen name={'Stage1'} component={Stage1} />
                <RootStack.Screen name={'Stage2'} component={Stage2} />
                <RootStack.Screen name={'Stage3'} component={Stage3} />
                <RootStack.Screen name={'Stage4'} component={Stage4} />
                <RootStack.Screen name={'Stage5'} component={Stage5} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}