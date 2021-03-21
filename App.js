import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabsScreens from 'inyector/src/components/tabs/TabsScreens';

function App() {
  return (
    <NavigationContainer>
      <TabsScreens />
    </NavigationContainer>
  );
}

export default App;
