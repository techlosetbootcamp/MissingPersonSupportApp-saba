import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from "../screens/register/Register"
import Login from "../screens/login/Login"
import ForgotPassword from '../screens/forgotPassword/ForgotPassword';
import Splash from "../screens/splash/Splash"
import Home from '../screens/Home/home';
export default function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
