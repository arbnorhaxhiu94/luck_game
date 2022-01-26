import React from "react";
import { Modal, View } from "react-native";
import { Colors } from "../../../../assets/colors/colors";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import { styles } from "./styles";

interface GameFinishedPopupProps {
    visible: boolean,
    mode: 'Single Player' | 'Two Players' | undefined,
    winner: 'Player1' | 'Player2',
    onPress(action: 'Quit' | 'Play' | 'Restart'): void
}

const GameFinishedPopup = ({
    visible,
    mode,
    winner,
    onPress
}: GameFinishedPopupProps) => {
    return (
        <Modal 
            visible={visible}
            transparent
            onRequestClose={() => {return}}
            style={{flex: 1}} >
            <View style={styles.screen}>
                <View style={styles.container}>

                    {/* Message */}
                    {mode == 'Single Player' ?
                    <Text 
                        text={winner == 'Player1' ? 'You lost' : 'You won'}
                        color={Colors.DARK_BLUE}
                        textAlign={'center'}
                        fontSize={20}
                        fontWeight={'bold'}
                         />
                    : mode == 'Two Players' ?
                    <Text 
                        text={winner == 'Player1' ? 'Player 1 won' : 'Player 2 won'}
                        color={Colors.DARK_BLUE}
                        textAlign={'center'}
                        fontSize={20}
                        fontWeight={'bold'} />
                    : null}

                    <View style={{height: 20}} />

                    {/* Button */}
                    {mode == 'Single Player' && winner == 'Player1' ?
                    <View style={styles.buttonsContainer}>
                        <Button 
                            text={'Quit'}
                            backgroundColor={Colors.ORANGE}
                            onPress={() => onPress('Quit')}
                            width={'50%'}
                            borderRadius={[0, 0, 0, 0]} />
                        <View style={{width: 1}}/>
                        <Button 
                            text={'Restart'}
                            backgroundColor={Colors.BLUE}
                            onPress={() => onPress('Restart')}
                            width={'50%'}
                            borderRadius={[0, 0, 0, 0]}  />
                    </View>
                    : mode == 'Single Player' && winner == 'Player2' ?
                    <Button 
                        text={'Next'}
                        backgroundColor={Colors.BLUE}
                        width={'100%'}
                        borderRadius={[0, 0, 0, 0]}
                        onPress={() => onPress('Play')} /> 
                    : mode == 'Two Players' ?
                    <View style={styles.buttonsContainer}>
                        <Button 
                            text={'Quit'}
                            backgroundColor={Colors.ORANGE}
                            onPress={() => onPress('Quit')}
                            width={'50%'}
                            borderRadius={[0, 0, 0, 0]} />
                        <View style={{width: 1}}/>
                        <Button 
                            text={'Play again'}
                            backgroundColor={Colors.BLUE}
                            onPress={() => onPress('Play')}
                            width={'50%'}
                            borderRadius={[0, 0, 0, 0]}  />
                    </View>
                    : null}
                </View>
            </View>
        </Modal>
    )
}

export default GameFinishedPopup;