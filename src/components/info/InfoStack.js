/* eslint-disable prettier/prettier */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InfoScreen from './InfoScreen';

const Stack = createStackNavigator();

const InfoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0,
        },
        headerTintColor: '#030067',
        headerTitleStyle: {
          fontWeight: '600',
          alignSelf: 'center',
        },
      })}>
      <Stack.Screen name="Información" component={InfoScreen} />
    </Stack.Navigator>
  );
};

export default InfoStack;
