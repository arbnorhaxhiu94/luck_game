import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "./RootNavigator";

export type HomeNavigationProps = NativeStackNavigationProp<RootStackParamsList, 'HomeScreen'>;
export type SelectStateNavigationProps = NativeStackNavigationProp<RootStackParamsList, 'SelectStageScreen'>;
export type Stage1NavigationProps = NativeStackNavigationProp<RootStackParamsList, 'Stage1'>;
export type Stage2NavigationProps = NativeStackNavigationProp<RootStackParamsList, 'Stage2'>;
export type Stage3NavigationProps = NativeStackNavigationProp<RootStackParamsList, 'Stage3'>;
export type Stage4NavigationProps = NativeStackNavigationProp<RootStackParamsList, 'Stage4'>;