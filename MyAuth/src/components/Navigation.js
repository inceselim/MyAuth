import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import MySignatureScreen from '../screens/MySignatureScreen';
import {useDispatch, useSelector} from 'react-redux';
import {isUserValid} from '../features/auth/authSlice';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const auth = useSelector(state => {
    return state.auth;
    //console.log(state.auth);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserValid());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#095AF1D6',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        }}>
        {auth.isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Signature" component={MySignatureScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
