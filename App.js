import * as React from 'react';
// import { View, Text, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StartScreen} from './src/screens/StartScreen'
import {LoginScreen} from './src/screens/LoginScreen'
import {EventsScreen} from './src/screens/EventsScreen'
import {EventScreen} from './src/screens/EventScreen'

import { RegistrationScreen } from './src/screens/RegistrationScreen';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize('', '');
Parse.serverURL = 'https://parseapi.back4app.com/';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer initialR>
      <Stack.Navigator 
      initialRouteName="StartScreen" 
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Events" component={EventsScreen} options={{gestureEnabled: false}}/>
        <Stack.Screen name="Event" component={EventScreen} options={{gestureEnabled: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;