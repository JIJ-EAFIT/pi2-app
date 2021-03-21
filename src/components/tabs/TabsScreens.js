import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainStack from 'inyector/src/components/inyector/MainStack';
import SettingsStack from 'inyector/src/components/settings/SettingsStack';
import InfoStack from 'inyector/src/components/info/InfoStack';
import store from 'react-native-simple-store';

const Tabs = createBottomTabNavigator();

const TabsScreens = () => {
  const initialConfig = {
    webserverUrl: 'http://192.168.4.1/',
    syringesMax: [10, 15],
    syringesSetPoint: [20, 0],
    containersNum: 10,
    delay: 3000,
    stepsPerCm: {x: 15, y: 35, z: 35},
  };

  const [config, setConfig] = useState(initialConfig);

  useEffect(() => {
    store
      .get('config')
      .then((res) => (res == null ? setConfig(initialConfig) : setConfig(res))); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('config changed');
    store.update('config', config);
  }, [config]);

  return (
    <Tabs.Navigator
      initialRouteName="Actividades"
      tabBarOptions={{
        inactiveTintColor: 'gray',
        activeTintColor: '#030067',
        keyboardHidesTabBar: true,
        /* showLabel: false, */
      }}>
      <Tabs.Screen
        name="Información"
        children={() => <InfoStack />}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('inyector/src/assets/images/info.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Actividades"
        children={() => <MainStack config={config} />}
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
        children={() => <SettingsStack config={config} setConfig={setConfig} />}
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
  );
};

export default TabsScreens;
