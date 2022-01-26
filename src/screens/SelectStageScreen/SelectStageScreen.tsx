import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { Animated, Image, StatusBar, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../assets/colors/colors";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Text from "../../components/Text";
import { SCREEN } from "../../config/Constants";
import { SelectStateNavigationProps } from "../../navigation/NavigationTypes";
import { RootStackParamsList } from "../../navigation/RootNavigator";
import { Stages } from "./config/StagesData";
import { styles } from "./styles";

const SelectStageScreen = () => {

    const route = useRoute<RouteProp<RootStackParamsList>>();
    const navigation = useNavigation<SelectStateNavigationProps>();

    const x = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        console.log(route.params?.Player);
    }, [])

    return (
        <LinearGradient 
            colors={[Colors.LIGHT_BLUE_EXTREME, Colors.BLUE]}
            style={styles.screen}>
            <StatusBar backgroundColor={Colors.LIGHT_BLUE_EXTREME} />
            <Header 
                title={''}
                titleTextColor={Colors.WHITE}
                goBack={() => navigation.goBack()} />
            <View style={styles.container}>
                {route.params?.Player == 'Two Players' ?
                <Text 
                    text={'Play with a friend'}
                    color={Colors.WHITE}
                    fontWeight={'bold'}
                    fontSize={16} />
                :
                <Text 
                    text={'Play to get on the Leadersboard '}
                    color={Colors.WHITE}
                    fontWeight={'bold'}
                    fontSize={16} />}
                <View style={styles.carouselContainer}>
                    <Animated.FlatList 
                        style={styles.stagesList}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        scrollEnabled={route.params?.Player == 'Two Players'}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: x }}}],
                            { useNativeDriver: true }
                        )}
                        data={Stages}
                        keyExtractor={item => item.id}
                        renderItem={({item, index}) => {

                            // const scale = scrollX.interpolate({
                            //     inputRange: [-1, 0, SCREEN.width*3/4 * index, SCREEN.width*3/4 * (index + 5)],
                            //     outputRange: [1, 1, 1, 0]
                            // });

                            const position = Animated.subtract(index * 500, x);

                            return (
                                <Animated.View 
                                style={[styles.itemAnimatedView, {
                                    opacity: position.interpolate({
                                            inputRange: [-500, 0, SCREEN.height - 300, SCREEN.height],
                                            outputRange: [0.5, 1, 1, 0.5],
                                        }),
                                    transform: [
                                        { 
                                            translateX: Animated.add(
                                                x,
                                                x.interpolate({
                                                    inputRange: [0, 0.000001 + index * SCREEN.width],
                                                    outputRange: [0, -index * SCREEN.width],
                                                    extrapolateRight: 'clamp'
                                                })
                                            )
                                        }, 
                                        {
                                            scale: position.interpolate({
                                                inputRange: [-500, 0, SCREEN.height - 300, SCREEN.height + 300],
                                                outputRange: [0.5, 1, 1, 0.5],
                                                extrapolate: 'clamp'
                                            })
                                        }
                                    ]
                                }]}>
                                    <View 
                                        style={[styles.stageItem, {
                                            backgroundColor: item.color,
                                            borderColor: item.color
                                        }]}>
                                        <Image 
                                            style={styles.image}
                                            source={item.image} />
                                        <View style={{height: 10}} />
                                        <Text 
                                            text={item.name}
                                            color={Colors.WHITE}
                                            textAlign={'center'}
                                            fontSize={18}
                                            fontWeight={'bold'} />
                                        <View style={{height: 10}} />
                                        <Button 
                                            text={'Play'}
                                            onPress={() => navigation.navigate(item.navigateTo, {Player: route.params?.Player})}
                                            backgroundColor={Colors.RED} />
                                    </View>
                                    
                                </Animated.View>
                            )
                        }} />
                </View>
                {route.params?.Player == 'Two Players' ?
                <View>
                    <Text 
                        text={'Slide to select prefered Stage'}
                        color={Colors.WHITE} />
                </View>
                : route.params?.Player == 'Single Player' &&
                <View>
                    <Text 
                        text={'Test your luck by winning 7 times in a row'}
                        color={Colors.WHITE} />
                </View>}
            </View>
            
        </LinearGradient>
    )
}

export default SelectStageScreen;