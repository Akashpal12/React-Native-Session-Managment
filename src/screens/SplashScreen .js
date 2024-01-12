// SplashScreen.js

import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Check if there is a user session by retrieving user information from AsyncStorage
      const userString = await AsyncStorage.getItem('user');

      if (userString) {
        // If user information exists, navigate to the 'Login' screen
        const user = JSON.parse(userString);
        navigation.replace('Login', {
          userName: user.userName,
          userId: user.userId,
        });
      } else {
        // If no user information exists, navigate to the 'Home' screen
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Error checking session:', error);
      // Handle the error accordingly (e.g., navigate to 'Home' screen)
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
