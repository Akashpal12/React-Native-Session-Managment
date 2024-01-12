import React, { useState,useEffect  } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();


function Home({ navigation }) {
  const [openNavigationPage, setOpenNavigationPage] = useState("Registration");
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    //checkSession();
  }, []);


  const checkSession = async () => {
    try {
      // Check if there is a user session
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const storedUser = JSON.parse(userString);
        // Navigate to 'MainScreen' if a session exists
        navigation.navigate('Login', {
          userName: storedUser.userName,
          userId: storedUser.userId,
        });
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  const handleLogin = async () => {
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

    try {
      // Retrieve user information from AsyncStorage
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const storedUser = JSON.parse(userString);

        // Compare entered credentials with stored user information
        if (userId === storedUser.userId && password === storedUser.password) {
          navigation.navigate('Login', {
            userName: storedUser.userName,
            userId: storedUser.userId,
          });
          console.warn('LogIn successful');
        } else {
          console.warn('Invalid credentials');
        }
      } else {
        console.warn('User not found. Please register first.');
      }
    } catch (error) {
      console.error('Error checking login credentials:', error);
    }

    // Reset user ID and password after login attempt
    setUserId('');
    setPassword('');
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

          <Text
            style={styles.forgot}
            onPress={() => navigation.navigate('Registration')}
            //onPress={()=> navigation.replace(openNavigationPage)}>
            >
            New Registration
          </Text>

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