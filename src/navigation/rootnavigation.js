// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import Header from '../components/Header';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

export function RootNavigation() {
  const user = useSelector(state => state.user_session);

  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          header: ({navigation, route, options, back}) => {
            const title = user === null ? '' : user.username;

            return (
              <Header
                title={title}
                navigation={navigation}
                style={options.headerStyle}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
