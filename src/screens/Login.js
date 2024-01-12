import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation ,route }) {
    const handleLogout = async () => {
        try {
            // Clear the session or any other data you want to clear
            await AsyncStorage.clear();
            console.warn('Logout successful');
            // Navigate back to Home.js
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const { userName, userId } = route.params;
    return (
        <View>
            <Text>Welcome to MainScreen!</Text>
            <Text>User Name: {userName}</Text>
            <Text>User ID: {userId}</Text>
            <Button mode="contained" onPress={handleLogout}>
                Logout
            </Button>
        </View>
    )
}

export default Login