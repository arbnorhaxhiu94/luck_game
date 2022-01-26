import React from "react";
import { Animated, Text, View } from "react-native";
import { styles } from "./styles";

interface DiceProps {
    diceRotateAnimation: Animated.Value,
    diceIsRotating: boolean,
    diceNumber: number
}

export const Dice = ({
    diceRotateAnimation,
    diceIsRotating,
    diceNumber
}: DiceProps) => {
    return (
        <Animated.View style={[styles.dice, {
            transform: [{
                rotateZ: diceRotateAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [`0deg`, `1800deg`]
                }),
            }]
        }]}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                {diceNumber == 1 ? 
                    <View style={styles.whiteDot} />
                : diceNumber == 2 ?
                    <View>
                        <View style={styles.whiteDot} />
                        <View style={{height: 20}} />
                        <View style={styles.whiteDot} />
                    </View> 
                : diceNumber == 3 ?
                    <View>
                        <View style={styles.whiteDot} />
                        <View style={{height: 10}} />
                        <View style={styles.whiteDot} />
                        <View style={{height: 10}} />
                        <View style={styles.whiteDot} />
                    </View>
                : diceNumber == 4 ?
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <View style={styles.whiteDot} />
                            <View style={{height: 20}} />
                            <View style={styles.whiteDot} />
                        </View>
                        <View style={{width: 20}} />
                        <View>
                            <View style={styles.whiteDot} />
                            <View style={{height: 20}} />
                            <View style={styles.whiteDot} />
                        </View>
                    </View>
                : diceNumber == 5 ?
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <View style={styles.whiteDot} />
                            <View style={{height: 20}} />
                            <View style={styles.whiteDot} />
                        </View>
                        <View style={{width: 5}} />
                        <View style={[styles.whiteDot, {alignSelf: 'center'}]} />
                        <View style={{width: 5}} />
                        <View>
                            <View style={styles.whiteDot} />
                            <View style={{height: 20}} />
                            <View style={styles.whiteDot} />
                        </View>
                    </View>
                : 
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <View style={styles.whiteDot} />
                            <View style={{height: 10}} />
                            <View style={styles.whiteDot} />
                            <View style={{height: 10}} />
                            <View style={styles.whiteDot} />
                        </View>
                        <View style={{width: 20}} />
                        <View>
                            <View style={styles.whiteDot} />
                            <View style={{height: 10}} />
                            <View style={styles.whiteDot} />
                            <View style={{height: 10}} />
                            <View style={styles.whiteDot} />
                        </View>
                    </View> }
            </View>
            {/* <Text style={styles.diceText}>{diceIsRotating ? '?' : diceNumber}</Text> */}
        </Animated.View>
    )
}