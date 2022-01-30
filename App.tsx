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
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    hideNavigationBar();
    SplashScreen.hide();
  }, []);

  return (
    <View style={{flex: 1}}>
      <RootNavigator />
    </View>
  )
}

export default App;
