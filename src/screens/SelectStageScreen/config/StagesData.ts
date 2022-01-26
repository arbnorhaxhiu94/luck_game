import { ColorValue } from "react-native";
import { Colors } from "../../../assets/colors/colors";

export interface StagesType {
    id: string,
    name: string,
    image: any,
    navigateTo: 'Stage1' | 'Stage2' | 'Stage3' | 'Stage4' | 'Stage5',
    color: ColorValue
}

export const Stages: StagesType[] =  [
    {
        id: '1',
        name: 'Stage 1',
        image: require('../../../assets/images/bg_stage1.png'),
        navigateTo: 'Stage1',
        color: Colors.DARK_BLUE_EXTREME
    },
    {
        id: '2',
        name: 'Stage 2',
        image: require('../../../assets/images/bg_stage2.png'),
        navigateTo: 'Stage2',
        color: Colors.DARK_BLUE_EXTREME
    },
    {
        id: '3',
        name: 'Stage 3',
        image: require('../../../assets/images/bg_stage3.png'),
        navigateTo: 'Stage3',
        color: Colors.DARK_BLUE_EXTREME
    },
    {
        id: '4',
        name: 'Stage 4',
        image: require('../../../assets/images/bg_stage4.png'),
        navigateTo: 'Stage4',
        color: Colors.DARK_BLUE_EXTREME
    },
    {
        id: '5',
        name: 'Stage 5',
        image: require('../../../assets/images/bg_stage5.png'),
        navigateTo: 'Stage5',
        color: Colors.DARK_BLUE_EXTREME
    }
];