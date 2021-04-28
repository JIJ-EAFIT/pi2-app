import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen';
import TaskDetail from './TaskDetail';
import TaskAdd from './TaskAdd';
import Colors from 'inyector/src/res/colors';
import FavsScreen from './FavsScreen';

import {TasksProvider} from '../../providers/tasksStore';
import {FavsProvider} from '../../providers/favsStore';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <FavsProvider>
      <>
        <TasksProvider>
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
                alignSelf:
                  route.name === 'Actividades' ? 'center' : 'flex-start',
              },
            })}>
            <Stack.Screen name="Actividades" component={MainScreen} />
            <Stack.Screen name="Editar actividad" component={TaskDetail} />
            <Stack.Screen name="Añadir actividad" component={TaskAdd} />
            <Stack.Screen name="Favoritos" component={FavsScreen} />
          </Stack.Navigator>
        </TasksProvider>
      </>
    </FavsProvider>
  );
};

export default MainStack;
