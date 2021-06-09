import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainStack from 'inyector/src/components/inyector/MainStack';
import SettingsStack from 'inyector/src/components/settings/SettingsStack';
// import InfoStack from 'inyector/src/components/info/InfoStack';

import KeepAwake from 'react-native-keep-awake';
import {ConfigProvider} from '../../providers/configStore';

const Tabs = createBottomTabNavigator();

const TabsScreens = () => {
  useEffect(() => {
    console.log('Keep awake activado');
    KeepAwake.activate();
  });
  return (
    <ConfigProvider>
      <Tabs.Navigator
        initialRouteName="Actividades"
        tabBarOptions={{
          inactiveTintColor: 'gray',
          activeTintColor: '#030067',
          keyboardHidesTabBar: true,
          /* showLabel: false, */
        }}>
        {/* <Tabs.Screen
          name="Información"
          component={InfoStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('inyector/src/assets/images/info.png')}
              />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="Actividades"
          component={MainStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('inyector/src/assets/images/lista.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Configuración"
          component={SettingsStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('inyector/src/assets/images/settings.png')}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </ConfigProvider>
  );
};

export default TabsScreens;
