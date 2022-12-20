import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from './context/app.context';
import {RootStackScreen} from './navigations';

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <RootStackScreen />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
