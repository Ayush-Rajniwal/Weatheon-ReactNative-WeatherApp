import React from 'react';

import Main from './components/Main';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const Drawer = createDrawerNavigator();


export default function App() {
  myGithubLink = () => {
    return Linking.openURL('https://github.com/Ayush-Rajniwal/Weatheon-ReactNative-WeatherApp')
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType={"slide"} edgeWidth={300} minSwipeDistance={5} initialRouteName="Main">
        <Drawer.Screen name="Weather" component={Main} />
        <Drawer.Screen name="Github Link" component={myGithubLink} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


