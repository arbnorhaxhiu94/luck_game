import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Easing, Image, ImageBackground, StatusBar, Text, View } from "react-native";
import { Colors } from "../../../assets/colors/colors";
import { SCREEN } from "../../../config/Constants";
import { initialValuesType } from "../calculations/initialValues/type";
import { Box } from "../components/Box/Box";
import { Dice } from "../components/Dice/Dice";
import { RollButton } from "../components/RollButton/RollButton";
import { SoldiersContainer } from "../components/SoldiersContainer/SoldiersContainer";
import { boxLeftPosition, boxTopPosition } from "./config/setBoxesPosition";
import { calculateUser1Step, calculateUser2Step } from "../calculations/stepCalculation";
import { styles } from "./styles";
import GameFinishedPopup from "../components/GameFinishedPopup/GameFinishedPopup";
import { RootStackParamsList } from "../../../navigation/RootNavigator";
import { Stage4NavigationProps } from "../../../navigation/NavigationTypes";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../../redux";
import { UserStateType } from "../../../redux/reducers/User/UserReducer";
import { StageSixInitialValues } from "../calculations/initialValues/StageSixInitialValues";

const Stage7 = () => {

    const route = useRoute<RouteProp<RootStackParamsList>>();
    const navigation = useNavigation<Stage4NavigationProps>();

    const dispatch = useDispatch();
    const { setUserData } = bindActionCreators(actionCreators, dispatch);

    const userState: UserStateType = useSelector((state: State) => state.userReducer);

    const dice1RotateAnimation = useRef(new Animated.Value(0)).current;
    const dice2RotateAnimation = useRef(new Animated.Value(0)).current;

    const [ dice1IsRotating, setDice1IsRotating ] = useState<boolean>(false);
    const [ dice2IsRotating, setDice2IsRotating ] = useState<boolean>(false);

    const [ boxes, setBoxes ] = useState<initialValuesType[]>(StageSixInitialValues);

    const [ player1Soldiers, setPlayer1Soldiers ] = useState<number>(3);
    const [ player2Soldiers, setPlayer2Soldiers ] = useState<number>(3);

    const [ player1DiceNumber, setPlayer1DiceNumber ] = useState<number>(1);
    const [ player2DiceNumber, setPlayer2DiceNumber ] = useState<number>(1);

    const [ turn, setTurn ] = useState<'Player1' | 'Player2'>('Player2');

    const [ result, setResult ] = useState<number[]>([0, 0]);

    const [ showGameFinishedPopup, setShowGameFinishedPopup ] = useState<boolean>(false);

    const rotateDice = (dice: Animated.Value) => {
        dice.setValue(0);
        Animated.timing(dice, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true
        }).start();
    }

    const rollPlayer1Dice = () => {
        setDice1IsRotating(true);
        rotateDice(dice1RotateAnimation)
        setTimeout(() => {
            const { diceNumber, tempBoxes } = calculateUser1Step(boxes);
            const {newTempBoxes, gameFinished} = checkPositions(tempBoxes, 'Player1');
            setPlayer1DiceNumber(diceNumber);
            console.log('Positions = '+JSON.stringify(newTempBoxes));
            setBoxes(newTempBoxes);
            if (gameFinished) {
                setShowGameFinishedPopup(true);
                return;
            }
            setTurn('Player2');
        }, 1000);
    }

    const rollPlayer2Dice = () => {
        setDice2IsRotating(true);
        rotateDice(dice2RotateAnimation);
        setTimeout(() => {
            const { diceNumber, tempBoxes } = calculateUser2Step(boxes);
            const {newTempBoxes, gameFinished} = checkPositions(tempBoxes, 'Player2');
            setPlayer2DiceNumber(diceNumber);
            setBoxes(newTempBoxes);
            console.log('Game finished: '+ gameFinished)
            if (gameFinished) {
                setShowGameFinishedPopup(true);
                if (route.params?.Player == 'Single Player') {
                    if (userState.user?.wins == 6) {
                        setUserData({
                            id: userState.user?.id,
                            username: userState.user.username,
                            wins: 7
                        });
                    }
                }
                return;
            }
            // if game is not finished
            if (!gameFinished) {
                rollPlayer1Dice();
            }
            setTurn('Player1');
        }, 1000);
    }

    const checkPositions = (
        tempBoxes: initialValuesType[], 
        playerTurn: 'Player1' | 'Player2'
    ) : {newTempBoxes: initialValuesType[], gameFinished?: boolean} => {
        setDice1IsRotating(false);
        setDice2IsRotating(false);
        let player1Position = 0;
        tempBoxes.some(box => {
            if(box.value == 1) {
                player1Position = tempBoxes.indexOf(box);
            }
        });
        let player2Position = 15;
        tempBoxes.some(box => {
            if(box.value == 2) {
                player2Position = tempBoxes.indexOf(box);
            }
        });

        if (playerTurn == 'Player1' && player1Position >= 7) {
            updatePositions(tempBoxes, player1Position, player2Position);
            setResult([result[0] + 1, result[1]]);

            if (result[0] == 1) {
                return {
                    newTempBoxes: tempBoxes,
                    gameFinished: true
                }
            }
        } else if (playerTurn == 'Player2' && player2Position <= 7) {
            updatePositions(tempBoxes, player1Position, player2Position);
            setResult([result[0], result[1] + 1]);

            if (result[1] == 1) {
                return {
                    newTempBoxes: tempBoxes,
                    gameFinished: true
                }
            }
        }

        return {newTempBoxes: tempBoxes};
    }

    const updatePositions = (
        tempBoxes: initialValuesType[], 
        player1Position: number, 
        player2Position: number
    ): void => {
        setPlayer1Soldiers(player1Soldiers - 1);
        setPlayer2Soldiers(player2Soldiers - 1);

        tempBoxes[player1Position].value = 0;
        tempBoxes[player2Position].value = 0;

        tempBoxes[0].value = 1;
        tempBoxes[14].value = 2;
    }

    const resetGame = () => {
        setShowGameFinishedPopup(false);
        setPlayer1Soldiers(3);
        setPlayer2Soldiers(3);
        StageSixInitialValues.forEach(box => {
            box.value = 0
        });
        StageSixInitialValues[0].value = 1;
        StageSixInitialValues[StageSixInitialValues.length-1].value = 2;
        setBoxes(StageSixInitialValues);
        setTurn('Player2');
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
      }, []);

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={Colors.BLACK} />
            <View style={styles.buttonDiceContainer} >
                <Dice 
                    diceRotateAnimation={dice1RotateAnimation}
                    diceIsRotating={dice1IsRotating}
                    diceNumber={player1DiceNumber} />
            </View>
            <SoldiersContainer
                left={0}
                soldiers={player1Soldiers}
                player={'Player1'} />

            <View 
                style={styles.stageContainer} >
                <Image
                    style={styles.stageBackgroundImage}
                    source={require('../../../assets/images/bg_champion.png')} />
                    {boxes.map(box => 
                        <ImageBackground 
                            key={Math.random()}
                            source={parseInt(box.id, 10) == 8 ?
                                require('../../../assets/images/trophy.png') :
                                require('../../../assets/images/finger.png')}
                            style={{ 
                                width: SCREEN.width/20, 
                                height: SCREEN.width/20,
                                margin: 3,
                                left: boxLeftPosition(parseInt(box.id, 10)),
                                top: boxTopPosition(parseInt(box.id, 10))} } >
                            <Box 
                                box={box}
                                color={box.value == 1 ? 'green' : box.value == 2 ? 'blue' : 'maroon'}
                                left={boxLeftPosition(parseInt(box.id, 10))}
                                top={boxTopPosition(parseInt(box.id, 10))} />
                        </ImageBackground>
                    )}
                <View style={styles.resultContainer}>
                    <Text style={[styles.resultText, {color: Colors.RED}]}>{result[0]}</Text>
                    <Text style={[styles.resultText, {color: Colors.WHITE}]}> : </Text>
                    <Text style={[styles.resultText, {color: Colors.BLUE}]}>{result[1]}</Text>
                </View>
            </View>

            <SoldiersContainer 
                left={SCREEN.width - 40}
                soldiers={player2Soldiers}
                player={'Player2'} />
            <View style={styles.buttonDiceContainer} >
                <Dice 
                    diceRotateAnimation={dice2RotateAnimation}
                    diceIsRotating={dice2IsRotating}
                    diceNumber={player2DiceNumber} />
                <RollButton 
                    disabled={turn == 'Player1' || dice2IsRotating}
                    backgroundColor={turn == 'Player2' ? Colors.BLUE : Colors.GRAY_A}
                    onPress={rollPlayer2Dice} />
            </View>

            <GameFinishedPopup 
                visible={showGameFinishedPopup}
                mode={route.params?.Player}
                winner={turn}
                onPress={(action) => {
                    resetGame();
                    if (action == 'Quit') {
                        if (route.params?.Player == 'Single Player') {
                            navigation.replace('HomeScreen');
                        } else {
                            navigation.goBack();
                        }
                    } else if (action == 'Restart'){
                        navigation.replace('Stage1', {Player: 'Single Player'});
                    } else {
                        navigation.replace('HomeScreen');
                    }
                }}
                lastStage={true} />
        </View>
    );
}

export default Stage7;
