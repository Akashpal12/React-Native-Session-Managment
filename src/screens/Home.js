import React, { useState } from 'react';
import { StyleSheet, View ,Text,Dimensions  } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');


function Home() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userIdError, setUserIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    const handleLogin = () => {
      // Reset previous errors
      setUserIdError('');
      setPasswordError('');
  
      if (!userId) {
        setUserIdError('Please enter a user ID.');
        return;
      }
  
      if (!password) {
        setPasswordError('Please enter a password.');
        return;
      }
  
      // Perform your authentication logic here
      console.warn('Logging in with:', userId, password);
    };
  
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.heading}>Login</Text>
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
              Login
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
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
    },
    input: {
      marginBottom: 0,
      marginTop:15,
      width: width - 32, // Set width using device width minus padding
    },
    button: {
      marginTop: 16,
      width: width - 32, // Set width using device width minus padding
    },
    errorText: {
      color: 'red',
      marginTop: 2,
      fontSize: 12,
    },
  });
  
  export default Home;