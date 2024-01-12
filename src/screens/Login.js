import React from 'react'
import { Button } from 'react-native-paper';

function Login() {
    return (
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
           Login
        </Button>
    )
}

export default Login