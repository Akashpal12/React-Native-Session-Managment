import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainContainer from './src/MainContainer';
import { PaperProvider, Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

const App = () => {

  return (

    <PaperProvider>
      <NavigationContainer>
        <Provider>
          <MainContainer />
        </Provider>
      </NavigationContainer>
    </PaperProvider>

  );
};

export default App;
