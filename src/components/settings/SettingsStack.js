/* eslint-disable prettier/prettier */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

const SettingsStack = ({config, setConfig}) => {
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
      <Stack.Screen
        name="Configuración"
        children={() => (
          <SettingsScreen config={config} setConfig={setConfig} />
        )}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
