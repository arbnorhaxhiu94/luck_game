/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { hideNavigationBar } from 'react-native-navigation-bar-color';

const App = () => {

  useEffect(() => {
    hideNavigationBar();
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <WarTanks />
      <DiceGame />
      <Stage2 /> */}
      {/* <HomeScreen /> */}
      <RootNavigator />
    </View>
  )
}

export default App;
