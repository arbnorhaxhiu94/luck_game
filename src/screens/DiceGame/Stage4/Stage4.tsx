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
import { hasPassedOverTheEnemy, hasReachedTheEnemyBase, hasSteppedOnTheEnemy } from "../calculations/checkPositions/checkPositions";
import { RootStackParamsList } from "../../../navigation/RootNavigator";
import { Stage4NavigationProps } from "../../../navigation/NavigationTypes";
import { StageFourInitialValues } from "../calculations/initialValues/StageFourInitialValues";

const Stage4 = () => {

    const route = useRoute<RouteProp<RootStackParamsList>>();
    const navigation = useNavigation<Stage4NavigationProps>();

    const dice1RotateAnimation = useRef(new Animated.Value(0)).current;
    const dice2RotateAnimation = useRef(new Animated.Value(0)).current;

    const [ dice1IsRotating, setDice1IsRotating ] = useState<boolean>(false);
    const [ dice2IsRotating, setDice2IsRotating ] = useState<boolean>(false);

    const [ boxes, setBoxes ] = useState<initialValuesType[]>(StageFourInitialValues);

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
                return;
            }
            // if game is not finished
            if (route.params?.Player == 'Single Player' && !gameFinished) {
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
        let player1Position = -1;
        tempBoxes.some(box => {
            if(box.value == 1) {
                player1Position = tempBoxes.indexOf(box);
            }
        });
        let player2Position = -1;
        tempBoxes.some(box => {
            if(box.value == 2) {
                player2Position = tempBoxes.indexOf(box);
            }
        });

        const { 
            newTempBoxes1, 
            stepped, 
            finished1, 
            result1, 
            player1Soldiers1, 
            player2Soldiers1 
        } = hasSteppedOnTheEnemy(
            tempBoxes, 
            playerTurn, 
            player1Position, 
            player2Position,
            player1Soldiers,
            player2Soldiers,
            result
        );

        if (stepped) {
            console.log(result1);
            if (player1Soldiers1 && player2Soldiers1) {
                setPlayer1Soldiers(player1Soldiers1);
                setPlayer2Soldiers(player2Soldiers1);
                if (result1) {
                    setResult(result1);
                }
            }

            return {
                newTempBoxes: newTempBoxes1,
                gameFinished: finished1
            };
        }

        const { 
            newTempBoxes2, 
            passedOver, 
            finished2, 
            result2, 
            player1Soldiers2, 
            player2Soldiers2
        } = hasPassedOverTheEnemy(
            tempBoxes, 
            playerTurn, 
            player1Position, 
            player2Position,
            result,
            player1Soldiers,
            player2Soldiers
        );

        if (passedOver) {
            console.log(result2);
            if (player1Soldiers2 && player2Soldiers2) {
                setPlayer1Soldiers(player1Soldiers2);
                setPlayer2Soldiers(player2Soldiers2);
                if (result2) {
                    setResult(result2);
                }
            }

            return {
                newTempBoxes: newTempBoxes2,
                gameFinished: finished2
            };
        }
        
        const { 
            newTempBoxes3, 
            finished3, 
            result3 
        } = hasReachedTheEnemyBase(
            tempBoxes, 
            playerTurn, 
            player1Position, 
            player2Position,
            result
        );
        if (finished3) {

            if (result3) {
                setResult(result3);
            }

            return {
                newTempBoxes: newTempBoxes3, 
                gameFinished: true
            };
        }

        return {newTempBoxes: tempBoxes};
    }

    const resetGame = () => {
        setShowGameFinishedPopup(false);
        setPlayer1Soldiers(3);
        setPlayer2Soldiers(3);
        StageFourInitialValues.forEach(box => {
            box.value = 0
        });
        StageFourInitialValues[0].value = 1;
        StageFourInitialValues[StageFourInitialValues.length-1].value = 2;
        setBoxes(StageFourInitialValues);
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
                {route.params?.Player == 'Single Player' ? null
                :
                <RollButton 
                    disabled={turn == 'Player2'}
                    backgroundColor={turn == 'Player1' ? Colors.RED : Colors.GRAY_A}
                    onPress={rollPlayer1Dice} />}
                <Dice 
                    diceRotateAnimation={dice1RotateAnimation}
                    diceIsRotating={dice1IsRotating}
                    diceNumber={player1DiceNumber} />
            </View>
            <SoldiersContainer
                left={SCREEN.width/8}
                soldiers={player1Soldiers}
                player={'Player1'} />

            <View 
                style={styles.stageContainer} >
                <Image
                    style={styles.stageBackgroundImage}
                    source={require('../../../assets/images/bg_wall.png')} />
                    {boxes.map(box => 
                        <ImageBackground 
                            key={Math.random()}
                            source={parseInt(box.id, 10) > 5 && parseInt(box.id, 10) < 14 ?
                                require('../../../assets/images/balcony.png')
                                :
                                require('../../../assets/images/stairs.png')}
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
                    <Text style={[styles.resultText, {color: Colors.ORANGE_LIGHT}]}>{result[0]}</Text>
                    <Text style={[styles.resultText, {color: Colors.WHITE}]}> : </Text>
                    <Text style={[styles.resultText, {color: Colors.BLUE}]}>{result[1]}</Text>
                </View>
            </View>

            <SoldiersContainer 
                left={SCREEN.width - SCREEN.width/4}
                soldiers={player2Soldiers}
                player={'Player2'} />
            <View style={styles.buttonDiceContainer} >
                <Dice 
                    diceRotateAnimation={dice2RotateAnimation}
                    diceIsRotating={dice2IsRotating}
                    diceNumber={player2DiceNumber} />
                <RollButton 
                    disabled={turn == 'Player1'}
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
                    } else if(action == 'Play') {
                        if (route.params?.Player == 'Single Player') {
                            navigation.replace('Stage5', {Player: 'Single Player'});
                        }
                    } else if (action == 'Restart'){
                        navigation.replace('Stage1', {Player: 'Single Player'});
                    } else {
                        navigation.replace('HomeScreen');
                    }
                }} />
        </View>
    )
}

export default Stage4;
