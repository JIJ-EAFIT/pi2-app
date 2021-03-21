import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen';
import TaskDetail from './TaskDetail';
import TaskAdd from './TaskAdd';
import Colors from 'inyector/src/res/colors';

const Stack = createStackNavigator();

const MainStack = ({config}) => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: '600',
          alignSelf: route.name === 'Actividades' ? 'center' : 'flex-start',
        },
      })}>
      <Stack.Screen
        name="Actividades"
        children={() => <MainScreen config={config} />}
      />
      <Stack.Screen name="Editar actividad" component={TaskDetail} />
      <Stack.Screen name="Añadir actividad" component={TaskAdd} />
    </Stack.Navigator>
  );
};

export default MainStack;
