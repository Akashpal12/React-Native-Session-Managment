
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'

import Home from './screens/Home';
import Login from './screens/Login';
import { SafeAreaView } from 'react-native';


const Stack = createNativeStackNavigator();

function MainContainer() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}

export default MainContainer