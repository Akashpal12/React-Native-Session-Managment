// Registration.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();


function Registration({navigation}) {

    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const [userNameError, setUserNameError] = useState('')
    const [userIdError, setUserIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
        // Reset previous errors
        setUserNameError('');
        setUserIdError('');
        setPasswordError('');
    
        if (!userName) {
            setUserNameError('Please enter a user Name.');
            return;
          }

        if (!userId) {
          setUserIdError('Please enter a user ID.');
          return;
        }
    
        if (!password) {
          setPasswordError('Please enter a password.');
          return;
        }
    
        // Perform your authentication logic here
        //console.warn('Logging in with:',  userName, userId, password);
        try {
            await AsyncStorage.setItem('user', JSON.stringify({ userName, userId, password }));
            //console.warn('Registration successful:', userName, userId, password);
            const userString = await AsyncStorage.getItem('user');
            const user = JSON.parse(userString);
            console.warn(user)
            
            // Optionally, you can navigate to another screen after successful registration
            // navigation.navigate('SomeOtherScreen');
          } catch (error) {
            console.error('Error storing user information:', error);
          }

        setUserName('');
        setUserId('');
        setPassword('');
      };

  return (
    <View style={styles.container}>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>New Registration</Text>
        <TextInput
          label="User Name"
          value={userName}
          onChangeText={(text) => {
            setUserName(text);
            setUserNameError(''); // Reset error when user starts typing
          }}
          style={styles.input}
          mode="outlined"
          placeholder="Enter your user Nmae"
          error={!!userNameError}
          helperText={userNameError}
        />
        {userNameError !== '' && (
          <Text style={styles.errorText}>{userNameError}</Text>
        )}
        <TextInput
          label="User ID"
          value={userId}
          onChangeText={(text) => {
            setUserId(text);
            setUserIdError(''); // Reset error when user starts typing
          }}
          style={styles.input}
          mode="outlined"
          placeholder="Enter your user ID"
          error={!!userIdError}
          helperText={userIdError}
        />
        {userIdError !== '' && (
          <Text style={styles.errorText}>{userIdError}</Text>
        )}
        <TextInput
          label="Password"
          value={password}
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(''); // Reset error when user starts typing
          }}
          style={styles.input}
          mode="outlined"
          placeholder="Enter your password"
          error={!!passwordError}
          helperText={passwordError}
        />
        {passwordError !== '' && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Register
        </Button>

      </View>
    </SafeAreaView>
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    heading: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
      color:'black'
    },
    input: {
      marginBottom: 0,
      marginTop: 15,
      width: width - 32, // Set width using device width minus padding
      backgroundColor: '#ffffff',
    },
    forgot: {
      marginTop: 8,
      textAlign: 'right',
      color: 'blue',
    },
    button: {
      marginTop: 46,
      width: width - 32, // Set width using device width minus padding
    },
    errorText: {
      color: 'red',
      marginTop: 2,
      fontSize: 12,
    },
  });

export default Registration;
